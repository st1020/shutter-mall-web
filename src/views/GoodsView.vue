<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in [goods.picture]" :key="thumb">
        <img :src="thumb" />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <template #title>
          <div class="goods-title">{{ goods.name }}</div>
          <div class="goods-price">{{ formatPrice() }}</div>
        </template>
      </van-cell>
      <van-cell class="goods-express">
        <template #title>
          <van-col span="10"> 描述：{{ goods.description }} </van-col>
          <van-col span="14"> 规格：{{ goods.specification }} </van-col>
          <van-col span="14">
            上市时间：{{ formatDate(goods.createDate) }}
          </van-col>
          <van-col span="14">
            修改时间：{{ formatDate(goods.lastModifiedDate) }}
          </van-col>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell
        value="进入店铺"
        icon="shop-o"
        is-link
        @click="showToast('进入店铺~')"
      >
        <template #title>
          <span class="van-cell-text">快门商城</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="会员中心" icon="user-o" is-link @click="onClickMember" />
      <van-cell
        title="线下门店"
        icon="location-o"
        is-link
        @click="showToast('线下门店~')"
      />
    </van-cell-group>

    <van-cell-group class="goods-cell-group" style="margin-bottom: 100px">
      <van-cell
        title="查看商品详情"
        is-link
        @click="showToast('查看商品详情~')"
      />
    </van-cell-group>

    <van-action-bar style="margin-bottom: 50px">
      <van-action-bar-icon icon="chat-o" @click="showToast('客服~')">
        客服
      </van-action-bar-icon>
      <van-action-bar-icon icon="cart-o" @click="onClickCart">
        购物车
      </van-action-bar-icon>
      <van-action-bar-button type="warning" @click="onClickAddCart">
        加入购物车
      </van-action-bar-button>
      <van-action-bar-button type="danger" @click="onClickBuy">
        立即购买
      </van-action-bar-button>
    </van-action-bar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { showToast, showConfirmDialog } from "vant";
import { fetchA, formatDate } from "@/utils";
import type { Product } from "@/types";

const route = useRoute();
fetchA<Product>(
  "/api/product/getProductInfo",
  JSON.stringify({ id: route.params.id })
).then((response) => {
  if (response != null) {
    goods.value = response;
  }
});

const goods = ref<Product>({
  id: 1,
  name: "Loading",
  description: "Loading",
  specification: "Loading",
  price: 0,
  createDate: "",
  lastModifiedDate: "",
  picture: "",
});

const formatPrice = () => {
  return "¥" + (goods.value.price / 100).toFixed(2);
};

const onClickMember = () => {
  router.push("/user");
};

const onClickCart = () => {
  router.push("/cart");
};

const onClickAddCart = () => {
  fetchA("/api/cart/addCart", JSON.stringify({ id: goods.value.id })).then(
    (r) => {
      if (r != null) {
        showToast("添加购物车成功！");
      }
    }
  );
};
const onClickBuy = () => {
  showConfirmDialog({
    title: "确认下单",
    message: "真的要下单吗？",
  })
    .then(() => {
      fetchA(
        "/api/order/submitOrder",
        JSON.stringify({ id: goods.value.id })
      ).then((r) => {
        if (r != null) {
          showToast("提交订单成功！");
        }
      });
    })
    .catch(() => {
      // on cancel
    });
};
</script>

<style lang="scss">
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>
