<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in [goods.picture]" :key="thumb">
        <img :src="thumb" />
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <template #title>
          <div class="goods-title">{{ goods.name }}</div>
          <div class="goods-price">{{ "¥" + formatPrice(goods.price) }}</div>
        </template>
      </van-cell>
      <van-cell class="goods-express">
        <template #title>
          <van-col span="10"> 库存：{{ goods.stock }} 件 </van-col>
          <van-col span="10"> 描述：{{ goods.description }} </van-col>
          <van-col span="14"> 规格：{{ goods.specification }} </van-col>
          <van-col span="14">
            上市时间：{{ formatDate(goods.createDate) }}
          </van-col>
          <van-col span="14">
            修改时间：{{ formatDate(goods.lastModifiedDate) }}
          </van-col>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell
        value="进入店铺"
        icon="shop-o"
        is-link
        @click="showToast('进入店铺~')"
      >
        <template #title>
          <span class="van-cell-text">{{ goods.shopInfo.name }}</span>
          <van-tag
            v-if="goods.shopInfo.type == 'ADMIN'"
            class="goods-tag"
            type="danger"
            >官方</van-tag
          >
        </template>
      </van-cell>
      <van-cell
        title="会员中心"
        icon="user-o"
        is-link
        @click="router.push('/user')"
      />
      <van-cell
        title="线下门店"
        icon="location-o"
        is-link
        @click="showPhysicalStore = true"
      />
      <van-cell
        title="直播带货"
        icon="gift-o"
        is-link
        @click="showVideo = true"
      />
    </van-cell-group>

    <van-cell-group class="goods-cell-group" style="margin-bottom: 100px">
      <van-cell title="查看商品详情" is-link @click="showDetail = true" />
    </van-cell-group>

    <van-popup
      v-model:show="showDetail"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px"
    >
      <div style="padding: 20px">
        <div v-html="goods.detail"></div>
      </div>
    </van-popup>

    <van-popup
      v-model:show="showPhysicalStore"
      round
      position="bottom"
      style="height: 88%; padding-top: 4px"
    >
      <h1 style="margin: 10px"><van-icon name="location-o" /> 线下门店</h1>
      <PhysicalStore />
      <div>
        <div style="margin: 10px">
          <van-tag type="primary" size="large">门店1</van-tag>
          北京市朝阳区文三路 138 号东方通信大厦 7 楼 501 室
        </div>
        <div style="margin: 10px">
          <van-tag type="primary" size="large">门店2</van-tag>
          上海市浦东区莫干山路 50 号
        </div>
        <div style="margin: 10px">
          <van-tag type="primary" size="large">门店3</van-tag>
          重庆市九龙坡区江南大道 15 号
        </div>
      </div>
    </van-popup>

    <van-popup
      v-model:show="showVideo"
      round
      position="bottom"
      style="height: 80%; padding-top: 4px"
    >
      <h1 style="margin: 10px"><van-icon name="gift-o" /> 直播带货</h1>
      <van-barrage v-model="barrageList">
        <div
          class="video"
          style="width: 100%; height: 150px; background-color: black"
        ></div>
      </van-barrage>
      <van-field
        v-model="barrage"
        center
        clearable
        label="弹幕"
        placeholder="请文明发言"
      >
        <template #button>
          <van-button size="small" type="primary" @click="addBarrage"
            >发送</van-button
          >
        </template>
      </van-field>
    </van-popup>

    <van-action-bar style="margin-bottom: 50px">
      <van-action-bar-icon icon="chat-o" @click="router.push('/chat')">
        客服
      </van-action-bar-icon>
      <van-action-bar-icon icon="cart-o" @click="router.push('/cart')">
        购物车
      </van-action-bar-icon>
      <van-action-bar-button type="warning" @click="onClickAddCart">
        加入购物车
      </van-action-bar-button>
      <van-action-bar-button type="danger" @click="onClickBuy">
        立即购买
      </van-action-bar-button>
    </van-action-bar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import router from "@/router";
import { useRoute } from "vue-router";
import { showToast } from "vant";
import { fetchA, formatDate, formatPrice } from "@/utils";
import type { Product } from "@/types";
import { useViewHistoryStore } from "@/stores/viewHistory";
import PhysicalStore from "@/components/PhysicalStore.vue";

const viewHistory = useViewHistoryStore();

const showDetail = ref(false);
const showPhysicalStore = ref(false);
const showVideo = ref(false);

const route = useRoute();
fetchA<Product>(
  "/api/product/getProductInfo",
  JSON.stringify({ id: route.params.id })
).then((response) => {
  if (response != null) {
    goods.value = response;
    viewHistory.addViewHistory(response);
  }
});

const goods = ref<Product>({
  id: 1,
  name: "Loading",
  description: "Loading",
  specification: "Loading",
  price: 0,
  createDate: "",
  lastModifiedDate: "",
  picture: "",
  shopInfo: {
    id: 0,
    name: "Loading",
    email: "Loading",
    type: "USER",
    createDate: "",
  },
  stock: 0,
  detail: "",
});

const onClickAddCart = async () => {
  let r = await fetchA(
    "/api/cart/addCart",
    JSON.stringify({ id: goods.value.id })
  );
  if (r != null) {
    showToast("添加购物车成功！");
  }
};
const onClickBuy = () => {
  router.push({
    name: "submitOrder",
    params: { ids: [goods.value.id] },
  });
};

const defaultList = [
  { id: 0, text: "真的好用" },
  { id: 1, text: "敏感肌也可以用" },
  { id: 2, text: "主播真好看" },
  { id: 3, text: "孩子很爱吃" },
  { id: 4, text: "已经买了100个" },
  { id: 5, text: "关注主播谢谢喵" },
  { id: 6, text: "666" },
];

const barrage = ref("");
const barrageList = ref<{ id: number; text: string }[]>([]);
const addBarrage = () => {
  barrageList.value.push({
    id: Math.random(),
    text: barrage.value,
  });
  barrage.value = "";
};
window.setInterval(() => {
  if (showVideo.value) {
    let id = Math.random();
    barrageList.value.push({
      id: id,
      text: defaultList[Math.floor(id * 1000) % 7].text,
    });
  }
}, 1000);
</script>

<style lang="scss">
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>
