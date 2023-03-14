<script setup lang="ts">
import { RouterView } from "vue-router";
const onClickLeft = () => history.back();
</script>

<template>
  <van-nav-bar
    title="快门商城"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <RouterView />
  <van-tabbar route>
    <van-tabbar-item replace to="/" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="user-o">用户</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
</style>
