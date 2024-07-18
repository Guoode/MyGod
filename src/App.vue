<template>
  <div class="page-wrapper">
    <div
      class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center min-h-screen text-white p-2 flex flex-col flex-grow"
    >
      <top class="bg-opacity-50 bg-slate-800 p-3 h-1/4 w-full" />
      <div class="flex flex-1 mt-2 flex-grow">
        <div class="flex-1 mr-2 flex flex-col">
          <maps class="bg-opacity-50 bg-slate-800 p-3 mt-2 flex-1" />
        </div>
        <div class="flex flex-col w-1/4">
          <div class="flex-1" style="display: flex; flex-direction: column">
            <minmap class="bg-opacity-50 bg-slate-800 p-3 flex-1" />
            <log class="bg-opacity-50 bg-slate-800 p-3 flex-1" />
          </div>
        </div>
      </div>
    </div>
    <bottom class="mt-2" />
  </div>
</template>
<script setup>
import top from "./components/top.vue"; // 顶部
import maps from "./components/maps.vue"; // 地图
import log from "./components/log.vue"; // 日志
import minmap from "./components/minmap.vue";
import bottom from "./components/bottom.vue"; // 底部
</script>
<style scoped>
/* 在这里可以添加样式，根据需要进行调整 */
</style>
