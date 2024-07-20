<template>
  <div class="page-wrapper">
    <div
      class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center min-h-screen text-white p-2 flex flex-col flex-grow"
    >
      <top
        class="bg-opacity-50 bg-slate-800 p-3 h-1/4 w-full"
        :deviceCount="deviceCount"
        :onlineDeviceCount="onlineDeviceCount"
      />
      <div class="flex flex-1 mt-2 flex-grow">
        <div class="flex-1 mr-2 flex flex-col">
          <maps
            class="bg-opacity-50 bg-slate-800 p-3 mt-2 flex-1"
            :devices="devices"
            :centerLng="centerLng"
            :centerLat="centerLat"
            @locationSelected="location = $event"
          />
        </div>
        <div class="flex flex-col w-1/4">
          <div class="flex-1" style="display: flex; flex-direction: column">
            <taint
              class="bg-opacity-50 bg-slate-800 p-3 flex-1"
              style="height: 70%"
            />
            <log
              class="bg-opacity-50 bg-slate-800 p-3 flex-1"
              style="height: 30%"
              :location="location"
            />
          </div>
        </div>
      </div>
    </div>
    <bottom class="mt-2" />
  </div>
</template>

<script>
import top from "./components/top.vue"; // 顶部
import maps from "./components/maps.vue"; // 地图
import log from "./components/log.vue"; // 日志
import taint from "./components/taint.vue"; //污染
import bottom from "./components/bottom.vue"; // 底部
import { ref } from "vue";

export default {
  components: {
    maps,
    log,
    top,
    taint,
    bottom,
  },
  setup() {
    const location = ref("");
    const devices = ref([]);
    const centerLng = ref(114.3);
    const centerLat = ref(30.6);
    const deviceCount = 100; // 设备总量
    const onlineDeviceCount = ref(0); // 在线设备数量

    const generateData = () => {
      const phValue = (Math.random() * 2 + 6).toFixed(1); // 生成一个新的 pH 值，范围在 6 到 8 之间
      const temperature = `${Math.floor(Math.random() * 15) + 15}°C`; // 生成一个新的温度值，范围在 15 到 30 之间
      const oxygenSaturation = `${(Math.random() * 10 + 90).toFixed(1)}%`; // 生成一个新的含氧量值，范围在 5 到 20 mg/L 之间
      const statuses = ["轻微", "中度", "严重"]; // 随机选择一个新的污染程度
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const waterConditions = ["清澈", "浑浊", "有色"]; // 随机选择一个新的水域情况
      const waterCondition =
        waterConditions[Math.floor(Math.random() * waterConditions.length)];
      devices.value.push({
        id: devices.value.length + 1,
        name: `demo${devices.value.length + 1}`,
        lng: Math.random() * 0.2 + centerLng.value - 0.1,
        lat: Math.random() * 0.2 + centerLat.value - 0.1,
        status,
        battery: Math.floor(Math.random() * 100),
        mobile: `10086${devices.value.length + 1}`,
        osVersion: `v${Math.floor(Math.random() * 5)}.${Math.floor(
          Math.random() * 10
        )}`,
        temperature,
        phValue,
        oxygenSaturation,
        waterCondition,
      });

      // 更新在线设备数量
      onlineDeviceCount.value = devices.value.filter(
        (device) => device.status !== "严重"
      ).length;
    };

    // 使用 setInterval 函数设置一个定时器，每隔 3000 毫秒（即 3 秒）调用一次 generateData 函数
    // 这样可以模拟数据随时间变化的效果
    setInterval(generateData, 3000);

    return {
      devices,
      centerLng,
      centerLat,
      location,
      deviceCount,
      onlineDeviceCount,
    };
  },
};
</script>

<style scoped>
/* 在这里可以添加样式，根据需要进行调整 */
</style>
