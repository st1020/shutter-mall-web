<template>
  <div>
    <van-card
      :title="user.name"
      :tag="user.type"
      thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      style="background-color: #fff"
    >
      <template #desc>
        <van-col span="10"><b>ID:</b> {{ user.id }}</van-col>
        <van-col span="14"><b>邮箱:</b> {{ user.email }}</van-col>
        <van-col span="14"
          ><b>创建时间:</b> {{ formatDate(user.createDate) }}</van-col
        >
      </template>
    </van-card>
    <van-row class="user-links">
      <van-col span="6" @click="router.push('/orders/SUBMIT')">
        <van-icon name="pending-payment" />
        已下单
      </van-col>
      <van-col span="6">
        <van-icon name="records" @click="router.push('/orders/CONFIRM')" />
        处理中
      </van-col>
      <van-col span="6">
        <van-icon name="failure" @click="router.push('/orders/REJECT')" />
        已拒绝
      </van-col>
      <van-col span="6">
        <van-icon name="completed" @click="router.push('/orders/FINISH')" />
        已完成
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell
        icon="records"
        title="全部订单"
        is-link
        @click="onClickOrders"
      />
    </van-cell-group>

    <van-cell-group class="user-group">
      <van-cell
        icon="points"
        title="我的积分"
        is-link
        @click="showToast('我的积分~')"
      />
      <van-cell
        icon="gold-coin-o"
        title="我的优惠券"
        is-link
        @click="onClickCoupon"
      />
      <van-cell
        icon="gift-o"
        title="我收到的礼物"
        is-link
        @click="showToast('我收到的礼物~')"
      />
    </van-cell-group>

    <van-cell-group>
      <van-cell
        icon="envelop-o"
        title="重置密码"
        @click="router.push('/user/setPassword')"
      />
      <van-cell icon="user-o" title="退出登陆" @click="logout" />
    </van-cell-group>
  </div>
</template>

<script lang="ts" setup>
import type { User } from "@/types";
import { fetchA, formatDate } from "@/utils";
import { ref } from "vue";
import { showToast } from "vant";
import router from "@/router";

const user = ref<User>({
  id: 0,
  name: "Loading",
  email: "Loading",
  type: "USER",
  createDate: "",
});

fetchA<User>("/api/user/getMyUserInfo", null).then((response) => {
  if (response != null) {
    user.value = response;
  }
});

const logout = () => {
  localStorage.clear();
  router.push("/login");
};

const onClickOrders = () => {
  router.push("/orders");
};

const onClickCoupon = () => {
  router.push("/coupons");
};
</script>

<style lang="scss">
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
