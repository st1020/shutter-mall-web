<template>
  <h1 style="text-align: center; padding-top: 80px">
    <van-icon name="user-o" />注册
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
        v-model="email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写游戏那个' }]"
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
        注册
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Result } from "../types";
import { showToast } from "vant";
import router from "@/router";
const username = ref("");
const email = ref("");
const password = ref("");
const onSubmit = async (values: {
  name: string;
  email: string;
  password: string;
}) => {
  console.log("submit", values);
  let r: Result<{ token: string }> = await fetch("/api/user/register", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((response) => response.json());
  if (r.code != 0) {
    showToast("注册失败：" + r.msg);
    return;
  }
  showToast("注册成功！");
  router.replace("/login");
};
</script>
