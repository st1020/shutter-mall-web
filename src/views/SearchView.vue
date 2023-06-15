<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <div v-for="item in goods" :key="item.id">
      <van-card
        :title="item.name"
        :desc="item.description"
        :price="formatPrice(item.price)"
        :thumb="item.picture"
        @click="onClick(item)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Product } from "@/types";
import { fetchA, formatPrice } from "@/utils";
import router from "@/router";

const value = ref("");
const goods = ref<Product[]>([]);

const onSearch = async (val: string) => {
  if (val !== "") {
    console.log(val);
    let products = await fetchA<Product[]>("/api/product/searchProduct", val);
    if (products != null) {
      goods.value = products;
    }
  } else {
    onCancel();
  }
};
const onCancel = async () => {
  let products = await fetchA<Product[]>("/api/product/getAll", null);
  if (products != null) {
    goods.value = products;
  }
};

onCancel();

const onClick = (product: Product) => {
  router.push("/goods/" + product.id);
};
</script>
