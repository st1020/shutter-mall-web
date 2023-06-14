<template>
  <div>
    <van-coupon-list
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      :show-close-button="false"
      @change="onChange"
      @exchange="onExchange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { CouponInfo } from "vant";

const coupon: CouponInfo = {
  id: 0,
  condition: "无门槛\n最多优惠12元",
  description: "",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元",
};

const coupons = ref<CouponInfo[]>([coupon]);
const chosenCoupon = ref<number>(-1);

const onChange = (index: number) => {
  chosenCoupon.value = index;
};
const onExchange = (code: string) => {
  console.log(code);
  coupons.value.push(coupon);
};
</script>

<style>
.van-coupon-list__bottom {
  display: none;
}
</style>
