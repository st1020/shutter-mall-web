<template>
  <h1 style="text-align: center; padding-top: 80px">
    <van-icon name="user-o" /> 登陆
  </h1>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="name"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        登陆
      </van-button>
    </div>
  </van-form>
  <div style="width: 90%; text-align: right">
    <router-link to="/register" style="color: gray; text-decoration: underline">
      注册
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Result } from "../types";
import { showToast } from "vant";
import { RouterLink } from "vue-router";
const username = ref("");
const password = ref("");
const onSubmit = async (values: { name: string; password: string }) => {
  console.log("submit", values);
  let r: Result<{ token: string }> = await fetch("/api/user/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((response) => response.json());
  if (r.code != 0) {
    showToast("登陆失败：" + r.msg);
    return;
  }
  window.localStorage.setItem("token", r.data.token);
  showToast("登陆成功！");
  history.back();
};
</script>
