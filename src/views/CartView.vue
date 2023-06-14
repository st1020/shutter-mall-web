<template>
  <div>
    <van-checkbox-group class="card-goods" v-model="checkedGoods">
      <van-checkbox
        class="card-goods__item"
        v-for="item in goods"
        :key="item.id"
        :name="item.id"
      >
        <van-card
          :title="item.name"
          :desc="item.description"
          :price="formatPrice(item.price)"
          :thumb="item.picture"
        >
          <template #num>
            <van-button size="mini" @click="deleteCart(item.id)">
              删除
            </van-button>
          </template>
        </van-card>
      </van-checkbox>
    </van-checkbox-group>
    <van-submit-bar
      :price="totalPrice"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
      style="margin-bottom: 50px"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { showToast } from "vant";
import type { Product } from "@/types";
import { fetchA } from "@/utils";
import router from "@/router";

const loadCart = () => {
  goods.value = [];
  checkedGoods.value = [];
  fetchA<Product[]>("/api/cart/getCartProducts", null).then((response) => {
    if (response != null) {
      goods.value = response;
    }
  });
};

const checkedGoods = ref<number[]>([]);
const goods = ref<Product[]>([]);

loadCart();

const formatPrice = (price: number) => {
  return (price / 100).toFixed(2);
};

const onSubmit = () => {
  router.push({
    name: "submitOrder",
    params: { ids: checkedGoods.value },
  });
};

const submitBarText = computed(() => {
  const count = checkedGoods.value.length;
  return "结算" + (count ? `(${count})` : "");
});

const totalPrice = computed(() =>
  goods.value.reduce(
    (total, item) =>
      total + (checkedGoods.value.indexOf(item.id) !== -1 ? item.price : 0),
    0
  )
);

const deleteCart = (productId: number) => {
  fetchA("/api/cart/deleteCart", JSON.stringify({ id: productId })).then(
    (r) => {
      if (r != null) {
        showToast("删除购物车商品成功");
        loadCart();
      }
    }
  );
};
</script>

<style lang="scss">
.card-goods {
  padding: 10px 0;
  background-color: #fff;

  &__item {
    position: relative;
    background-color: #fafafa;

    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__price {
      color: #f44;
    }
  }
}
</style>
