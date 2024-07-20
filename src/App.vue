<template>
  <div class="page-wrapper">
    <div
      class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center min-h-screen text-white p-2 flex flex-col flex-grow"
    >
      <top class="bg-opacity-50 bg-slate-800 p-3 h-1/4 w-full" />
      <div class="flex flex-1 mt-2 flex-grow">
        <div class="flex-1 mr-2 flex flex-col">
          <maps
            class="bg-opacity-50 bg-slate-800 p-3 mt-2 flex-1"
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
    return { location };
  },
};
</script>
<style scoped>
/* 在这里可以添加样式，根据需要进行调整 */
</style>
