<template>
  <div>
    <van-cell-group
      inset
      style="background-color: darkgray; margin-top: 10px; margin-bottom: 10px"
    >
      <van-contact-card
        type="edit"
        :name="list[parseInt(chosenAddressId)].name"
        :tel="list[parseInt(chosenAddressId)].tel"
        :editable="false"
      />
      <van-cell
        title="地址"
        :label="list[parseInt(chosenAddressId)].address"
        @click="showAddress = true"
      >
        <template #extra>
          <van-icon name="edit" style="font-size: 16px" />
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group
      inset
      style="background-color: darkgray; margin-top: 10px; margin-bottom: 10px"
    >
      <div v-for="item in goods" :key="item.id">
        <van-card
          :title="item.name"
          :desc="item.description"
          :price="formatPrice(item.price)"
          :thumb="item.picture"
          @click="onClick(item)"
        />
      </div>
    </van-cell-group>

    <van-cell-group>
      <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />
      <van-radio-group v-model="payMethod">
        <van-cell
          ><van-radio name="0">
            <van-icon name="balance-o" /> 零钱
          </van-radio></van-cell
        >
        <van-cell
          ><van-radio name="1">
            <van-icon name="credit-pay" /> 信用卡
          </van-radio></van-cell
        >
        <van-cell
          ><van-radio name="2">
            <van-icon name="paid" /> 支付宝
          </van-radio></van-cell
        >
      </van-radio-group>
    </van-cell-group>

    <div style="height: 50px"></div>

    <van-popup
      v-model:show="showList"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px"
    >
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>

    <van-popup
      v-model:show="showAddress"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px"
    >
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="showAddressEdit = true"
        @edit="showAddressEdit = true"
      />
    </van-popup>

    <van-popup
      v-model:show="showAddressEdit"
      round
      position="bottom"
      style="height: 80%; padding-top: 4px"
    >
      <van-address-edit
        show-delete
        show-set-default
        show-search-result
        :search-result="[]"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
      />
    </van-popup>

    <van-popup
      v-model:show="showPassword"
      round
      position="bottom"
      style="height: 70%; padding-top: 4px"
    >
      <van-password-input
        :value="password"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
        style="margin-top: 20px; margin-bottom: 20px"
      />
      <van-button type="primary" size="large" round @click="confirmPwd"
        >确认</van-button
      >
      <van-number-keyboard
        v-model="password"
        :show="showKeyboard"
        @blur="showKeyboard = false"
      />
    </van-popup>

    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Product } from "@/types";
import { fetchA, formatPrice } from "@/utils";
import router from "@/router";
import { showToast, showConfirmDialog } from "vant";
import { useRoute } from "vue-router";
import type { CouponInfo } from "vant";

const route = useRoute();

const productIds: number[] = (route.params.ids as string[]).map((v) =>
  parseInt(v)
);

const goods = ref<Product[]>([]);
const totalPrice = ref<number>(0);
let rawtotalPrice = 0;

productIds.forEach(async (id) => {
  let product = await fetchA<Product>(
    "/api/product/getProductInfo",
    JSON.stringify({ id: id })
  );
  if (product != null) {
    goods.value.push(product);
    rawtotalPrice += product.price;
    totalPrice.value = rawtotalPrice;
  }
});

const onClick = (product: Product) => {
  router.push("/goods/" + product.id);
};

const submit = () => {
  let noStock = goods.value.some((good) => good.stock <= 0);
  if (noStock) {
    showToast("抱歉，库存不足，请联系商家补货！");
    return;
  }
  showConfirmDialog({
    title: "确认下单",
    message: "真的要下单吗？",
  })
    .then(async () => {
      let r = await fetchA(
        "/api/order/submitOrders",
        JSON.stringify(goods.value.map((v) => v.id))
      );
      if (r != null) {
        showToast("提交订单成功！");
      }
    })
    .catch(() => {
      // on cancel
    });
};

const confirmPwd = () => {
  if (password.value == "000000") {
    submit();
  } else {
    password.value = "";
    showToast("密码错误！");
  }
};

const onSubmit = () => {
  if (payMethod.value != "0") {
    submit();
  } else {
    password.value = "";
    showPassword.value = true;
  }
};

const coupon: CouponInfo = {
  id: 0,
  condition: "无门槛\n最多优惠12元",
  description: "",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元",
};

const coupons = ref<CouponInfo[]>([coupon]);
const chosenCoupon = ref<number>(-1);
const showList = ref(false);
const showAddress = ref(false);
const showAddressEdit = ref(false);

const showPassword = ref(false);
const showKeyboard = ref(true);
const password = ref("123");

const onChange = (index: number) => {
  if (index == -1) {
    totalPrice.value = rawtotalPrice;
  } else {
    totalPrice.value = rawtotalPrice - 150;
  }
  chosenCoupon.value = index;
};
const onExchange = (code: string) => {
  console.log(code);
  coupons.value.push(coupon);
};

const payMethod = ref("0");

const chosenAddressId = ref("0");
const list = [
  {
    id: "0",
    name: "张三",
    tel: "13000000000",
    address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
    isDefault: true,
  },
  {
    id: "1",
    name: "李四",
    tel: "1310000000",
    address: "浙江省杭州市拱墅区莫干山路 50 号",
  },
];
const disabledList = [
  {
    id: "2",
    name: "王五",
    tel: "1320000000",
    address: "浙江省杭州市滨江区江南大道 15 号",
  },
];
</script>
