<template>
  <div style="margin-bottom: 100px">
    <h1 style="margin-left: 20px"><van-icon name="orders-o" /> 订单</h1>
    <van-empty description="暂无订单～" v-if="goods.length == 0" />
    <div v-for="item in goods" :key="item.id">
      <van-card
        :title="item.product.name"
        :price="formatPrice(item.product.price)"
        :thumb="item.product.picture"
        @click="onClick(item)"
      >
        <template #desc>
          <van-col span="10"> <b>订单编号:</b> {{ item.id }} </van-col>
          <van-col span="14">
            <b>下单时间:</b> {{ formatDate(item.createDate) }}
          </van-col>
        </template>
        <template #num>
          <b>{{ formatOrderStatus(item.orderStatus) }}</b>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Order } from "@/types";
import { fetchA, formatDate } from "@/utils";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();
if (route.params.type == "") {
  fetchA<Order[]>("/api/order/getMyOrders", null).then((orders) => {
    if (orders != null) {
      goods.value = orders;
    }
  });
} else {
  fetchA<Order[]>(
    "/api/order/getMyOrdersByOrderStates",
    JSON.stringify(route.params.type)
  ).then((orders) => {
    if (orders != null) {
      goods.value = orders;
    }
  });
}

const goods = ref<Order[]>([]);

const formatPrice = (price: number) => {
  return (price / 100).toFixed(2);
};

const onClick = (order: Order) => {
  router.push("/goods/" + order.product.id);
};

const formatOrderStatus = (orderStatus: string) => {
  let r: string = "未知";
  switch (orderStatus) {
    case "SUBMIT":
      r = "已提交";
      break;
    case "CONFIRM":
      r = "已确认";
      break;
    case "REJECT":
      r = "拒绝";
      break;
    case "FINISH":
      r = "完成";
      break;
  }
  return r;
};
</script>

<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
