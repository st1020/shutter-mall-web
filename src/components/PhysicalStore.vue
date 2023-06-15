<template>
  <v-chart style="height: 50vh" :option="option" autoresize />
</template>

<script setup lang="ts">
import { use, registerMap } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { EffectScatterChart } from "echarts/charts";
import china from "@/assets/china.json";
import { GeoComponent } from "echarts/components";
import VChart from "vue-echarts";
import { ref } from "vue";

use([CanvasRenderer, EffectScatterChart, GeoComponent]);

// @ts-ignore
registerMap("china", china);

const option = ref({
  geo: {
    map: "china",
    silent: true,
  },
  series: [
    {
      type: "effectScatter",
      coordinateSystem: "geo",
      data: [
        {
          name: "上海",
          value: [121.47, 31.23, 55],
        },
        {
          name: "北京",
          value: [116.4, 39.9, 110],
        },
        {
          name: "重庆",
          value: [106.55, 29.56, 32], // value的前两项是经纬度坐标，第三项为污染度数据
        },
      ],
    },
  ],
});
</script>
