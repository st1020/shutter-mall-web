<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img
          style="width: 360px; height: 160px"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
        />
      </van-swipe-item>
      <van-swipe-item>
        <img
          style="width: 360px; height: 160px"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg"
        />
      </van-swipe-item>
      <van-swipe-item class="text-swipe">物美价廉</van-swipe-item>
      <van-swipe-item class="text-swipe">新鲜美味</van-swipe-item>
      <van-swipe-item class="text-swipe">方便快捷</van-swipe-item>
      <van-swipe-item class="text-swipe">不知道写啥了</van-swipe-item>
    </van-swipe>
    <div v-for="item in goods" :key="item.id">
      <van-card
        :title="item.name"
        :desc="item.description"
        :num="1"
        :price="formatPrice(item.price)"
        :thumb="item.picture"
        @click="onClick(item)"
      />
    </div>
    <div style="height: 50px"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Product } from "@/types";
import { fetchA } from "@/utils";
import router from "@/router";

fetchA<Product[]>("/api/product/getAll", null).then((products) => {
  if (products != null) {
    goods.value = products;
  }
});
const goods = ref<Product[]>([]);

const formatPrice = (price: number) => {
  return (price / 100).toFixed(2);
};

const onClick = (product: Product) => {
  router.push("/goods/" + product.id);
};
</script>

<style>
.text-swipe {
  color: #fff;
  font-size: 20px;
  line-height: 160px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
