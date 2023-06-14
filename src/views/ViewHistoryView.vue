<template>
  <div style="margin-bottom: 100px">
    <h1 style="margin-left: 20px"><van-icon name="clock-o" /> 浏览历史</h1>
    <van-empty
      description="暂无浏览历史～"
      v-if="viewHistory.viewHistory.length == 0"
    />
    <div v-for="item in viewHistory.viewHistory" :key="item.id">
      <van-card
        :title="item.name"
        :desc="item.description"
        :num="1"
        :price="formatPrice(item.price)"
        :thumb="item.picture"
        @click="onClick(item)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Product } from "@/types";
import { formatPrice } from "@/utils";
import router from "@/router";
import { useViewHistoryStore } from "@/stores/viewHistory";

const viewHistory = useViewHistoryStore();

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
