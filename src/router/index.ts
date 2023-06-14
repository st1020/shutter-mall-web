import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "user",
      path: "/user",
      component: () => import("@/views/UserView.vue"),
      meta: {
        title: "会员中心",
      },
    },
    {
      name: "cart",
      path: "/cart",
      component: () => import("@/views/CartView.vue"),
      meta: {
        title: "购物车",
      },
    },
    {
      name: "goods",
      path: "/goods/:id",
      component: () => import("@/views/GoodsView.vue"),
      meta: {
        title: "商品详情",
      },
    },
    {
      name: "home",
      path: "/",
      component: () => import("@/views/ShopView.vue"),
      meta: {
        title: "主页",
      },
    },
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/LoginView.vue"),
      meta: {
        title: "登陆",
      },
    },
    {
      name: "register",
      path: "/register",
      component: () => import("@/views/RegisterView.vue"),
      meta: {
        title: "注册",
      },
    },
    {
      name: "orders",
      path: "/orders/:type?",
      component: () => import("@/views/OrdersView.vue"),
      meta: {
        title: "订单",
      },
    },
    {
      name: "search",
      path: "/search",
      component: () => import("@/views/SearchView.vue"),
      meta: {
        title: "搜索",
      },
    },
    {
      name: "coupons",
      path: "/coupons",
      component: () => import("@/views/CouponsView.vue"),
      meta: {
        title: "优惠劵",
      },
    },
    {
      name: "submitOrder",
      path: "/submitOrder/:ids(\\d+)+",
      component: () => import("@/views/SubmitOrder.vue"),
      meta: {
        title: "提交订单",
      },
    },
  ],
});

export default router;
