<template>
  <h1 style="text-align: center; padding-top: 80px">
    <van-icon name="user-o" /> 重置密码
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
        type="email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
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

const username = ref("");
const email = ref("");
const onSubmit = async (values: { name: string; email: string }) => {
  let r: Result<{ token: string }> = await fetch("/api/user/resetPwd", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((response) => response.json());
  if (r.code != 0) {
    showToast("失败：" + r.msg);
    return;
  }
  showToast("重置密码邮件已经发送！");
};
</script>
