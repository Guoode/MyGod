<template>
  <div
    class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center min-h-screen text-white p-2 flex flex-col flex-grow"
  >
    <top class="bg-opacity-50 bg-slate-800 p-3 h-1/5 w-full" />
    <div class="flex flex-1 mt-2 flex-grow">
      <div class="flex-1 mr-2 flex flex-col">
        <map class="bg-opacity-50 bg-slate-800 p-3 mt-2 flex-1" />
      </div>

      <!-- 右 -->
      <div
        class="w-1/3 ml-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col h-full"
      >
        <log class="h-full box-border pb-4" />
      </div>
    </div>
  </div>
</template>

<script setup>
import top from "./components/top.vue"; //顶部
import map from "./components/map.vue";
import log from "./components/log.vue"; //日志
//import bottom from "./components/bottom.vue";//底部
</script>
