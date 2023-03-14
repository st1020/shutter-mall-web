import router from "@/router";
import type { Result } from "./types";
import { showToast } from "vant";

export async function fetchA<T>(
  input: RequestInfo | URL,
  body: BodyInit | null | undefined
): Promise<T | null> {
  const token = window.localStorage.getItem("token");
  if (token == undefined) {
    showToast("未登录！");
    router.push("/login");
    return null;
  }
  try {
    const r: Result<T> = await fetch(input, {
      method: "post",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: body,
    }).then((response) => response.json());
    if (r.code != 0 || r.data == undefined || r.data == null) {
      showToast("请求失败：" + r.msg);
    }
    return r.data;
  } catch {
    showToast("请求失败!");
    return null;
  }
}

export const formatDate = (dateString: string | Date) => {
  return new Date(dateString).toLocaleString();
};
