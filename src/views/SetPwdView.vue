<template>
  <h1 style="text-align: center; padding-top: 80px">
    <van-icon name="user-o" />重置密码
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
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Result } from "../types";
import { showToast } from "vant";
import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();

let token: string = route.params.token as string;
if (token == "") {
  token = window.localStorage.getItem("token") as string;
} else {
  token = atob(token);
}

const username = ref("");
const password = ref("");
const onSubmit = async (values: { name: string; password: string }) => {
  let r: Result<{ token: string }> = await fetch("/api/user/setPassword", {
    method: "post",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((response) => response.json());
  if (r.code != 0) {
    showToast("失败：" + r.msg);
    return;
  }
  showToast("重置密码成功，请重新登录！");
  router.replace("/login");
};
</script>
