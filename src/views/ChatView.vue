<template>
  <div class="Serve" :style="{ height: curHeight + 'px' }">
    <!-- 顶部标签栏 -->
    <div class="title_wrap">
      <div class="Title">
        <!-- 头部组件编写 -->
        <div class="top">
          <!-- 顶部图标区 -->
          <div class="top_icon">
            <div class="top_icon_left">
              <van-icon
                v-if="true"
                @click="router.back()"
                size="24px"
                color="#fff"
                name="arrow-left"
              />
            </div>
            <div class="top_icon_right">
              <van-icon
                v-if="false"
                @click="router.push('/')"
                size="24px"
                color="#fff"
                name="plus"
                class="btn_icon"
              />
              <van-icon
                v-if="false"
                @click="router.push('/')"
                size="24px"
                color="#fff"
                name="search"
                class="btn_icon"
              />
            </div>
          </div>
          <div class="top_title">我的客服</div>
        </div>
      </div>
    </div>
    <div class="serve_main" ref="list">
      <div
        class="message_wrap"
        v-for="(item, index) in messageList"
        :key="index"
      >
        <!-- 客服信息 -->
        <div class="OtherChat" v-if="item.user == 'other'">
          <div class="other_user">
            <div class="time">{{ item.time }}</div>
            <div class="user_main">
              <div class="avatar_wrap">
                <van-image round width="46" height="46" :src="item.avatar" />
              </div>
              <div class="triangle_left"></div>
              <div class="user_message">
                {{ item.con }}
              </div>
            </div>
          </div>
        </div>
        <!-- 我的信息 -->
        <div class="MyChat" v-else>
          <div class="my_user">
            <div class="time">{{ item.time }}</div>
            <div class="other_main">
              <div class="other_message">
                {{ item.con }}
              </div>
              <div class="triangle_right"></div>
              <div class="avatar_wrap">
                <van-image round width="46" height="46" :src="item.avatar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="inp_wrap">
      <input
        class="inp"
        v-model="sendVal"
        v-on:keyup.enter="send"
        type="text"
        placeholder="请输入内容..."
      />
      <van-icon
        class="icon_inp"
        size="24px"
        color="#9a9a9a"
        name="smile-o"
        @click="showPopup"
      />
      <van-icon
        class="icon_inp"
        size="24px"
        color="#9a9a9a"
        name="add-o"
        @click="showPopup"
      />
      <van-popup
        v-model:show="show"
        round
        position="bottom"
        :style="{ height: '45%' }"
      >
        <van-image src="/emoji.jpg" width="100%" height="100%" />
      </van-popup>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref, getCurrentInstance, nextTick } from "vue";
import { fetchA, formatDate } from "@/utils";
import type { User } from "@/types";

const show = ref(false);
const showPopup = () => {
  show.value = true;
};

const { proxy } = getCurrentInstance();

const userInfo = ref<User>({
  id: 0,
  name: "Loading",
  email: "Loading",
  type: "USER",
  createDate: "",
});

fetchA<User>("/api/user/getMyUserInfo", null).then((response) => {
  if (response != null) {
    userInfo.value = response;
  }
});

function findScroller(element: HTMLElement) {
  element.onscroll = function () {
    // console.log(element);
  };
  Array.from(element.children).forEach(findScroller);
}
findScroller(document.body);

// 屏幕高度
const curHeight = ref(0);
// 信息体
const messageList = ref([
  {
    avatar: "https://bucket-ans.oss-cn-hangzhou.aliyuncs.com/2.jpg",
    time: formatDate(new Date()),
    con: "您好，欢迎来带我的客服中心，您的专属客服小浴为您服务！",
    user: "other",
  },
  {
    avatar: "https://bucket-ans.oss-cn-hangzhou.aliyuncs.com/2.jpg",
    time: formatDate(new Date()),
    con: "我们致力于打造一个为老人服务至上的平台！",
    user: "other",
  },
  {
    avatar: "https://bucket-ans.oss-cn-hangzhou.aliyuncs.com/2.jpg",
    time: formatDate(new Date()),
    con: "如有疑问请致电 109-3301-4401！",
    user: "other",
  },
  {
    avatar: "https://bucket-ans.oss-cn-hangzhou.aliyuncs.com/2.jpg",
    time: formatDate(new Date()),
    con: "小浴随时在线为您解答疑惑，请问您有什么需要帮助的嘛？",
    user: "other",
  },
  {
    avatar: "https://bucket-ans.oss-cn-hangzhou.aliyuncs.com/2.jpg",
    time: formatDate(new Date()),
    con: "小浴随时在线为您解答疑惑，举报电话请联系：109-4401-3301",
    user: "other",
  },
]);
const sendVal = ref("");

initMessage();
beforeMount(0);

function initMessage() {
  var other = {
    avatar: "https://bucket-ans.oss-cn-hangzhou.aliyuncs.com/2.jpg",
    time: formatDate(new Date()),
    con: "您好，欢迎来带我的客服中心，您的专属客服小浴为您服务，如有疑问请致电官方：109-4431-2231，小浴可能还不够聪明，如果有什么冒犯的地方请您理解！",
    user: "other",
  };
  setTimeout(() => {
    messageList.value.push(other);
  }, 1000);
}

// 发送消息
function send() {
  var item = {
    avatar: "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg",
    time: formatDate(new Date()),
    con: sendVal.value,
    user: "my",
  };
  messageList.value.push(item);
  nextTick(() => {
    window.scrollTo(0, proxy.$refs.list.scrollHeight);
  });
  sendVal.value = "";
  var other = {
    avatar: "https://bucket-ans.oss-cn-hangzhou.aliyuncs.com/2.jpg",
    time: formatDate(new Date()),
    con: "很抱歉，我没听懂您在说什么",
    user: "other",
  };
  setTimeout(() => {
    messageList.value.push(other);
    nextTick(() => {
      window.scrollTo(0, proxy.$refs.list.scrollHeight);
    });
  }, 2000);
}

// 获取屏幕高度
function beforeMount(height: number) {
  var h = document.documentElement.clientHeight || document.body.clientHeight;
  curHeight.value = h - height; //减去页面上固定高度height
}
</script>

<style scoped>
.title_wrap {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 99;
}

.ser_img {
  width: 100%;
}

.serve_main {
  padding: 30px 20px 120px;
}

.inp_wrap {
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
}

.inp_wrap {
  padding: 10px 0;
  position: fixed;
  bottom: 0px;
  background-color: #fff;
  width: 100%;
  left: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 99;
}

.icon_inp {
  margin: 0px 20px;
}

.inp {
  border: none;
  margin-left: 20px;
  background-color: #ededed;
  padding: 12px 10px;
  border-radius: 10px;
  width: 66%;
}

.time {
  text-align: center;
  color: #9a9a9a;
  padding-bottom: 20px;
}

/* 我的信息 */
.my_user {
  padding-bottom: 30px;
}

.other_main {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.other_message {
  padding: 15px 10px;
  border-radius: 20px;
  color: #000;
  line-height: 34px;
  background-color: #ededed;
  max-width: 60%;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}

.triangle_right {
  width: 0;
  height: 0;
  border-top: 16px solid transparent;
  margin-right: 20px;
  border-left: 20px solid #ededed;
  border-bottom: 16px solid transparent;
}

.top {
  padding: 6px;
  background-color: #3c86df;
  border-bottom: 1px solid #ececec;
  display: flex;
}

.top_title {
  margin: 10px;
  font-size: 20px;
  color: #fff;
}

.top_icon {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn_icon {
  margin: 0px 20px;
}

.time {
  text-align: center;
  color: #9a9a9a;
  padding-bottom: 20px;
}

.other_user {
  padding-bottom: 30px;
}

.user_main {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.user_message {
  /* display: inline-block; */
  padding: 10px 10px;
  border-radius: 20px;
  color: #000;
  background-color: #ededed;
  max-width: 60%;
  line-height: 30px;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}

.triangle_left {
  width: 0;
  height: 0;
  border-top: 16px solid transparent;
  margin-left: 20px;
  border-right: 20px solid #ededed;
  border-bottom: 16px solid transparent;
}
</style>
