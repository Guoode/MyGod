<template>
  <div class="top-bar">
    <div class="left-section">
      <div class="device-count" :style="{ color: deviceColor }">
        设备总量：<span style="color: yellow">{{ deviceCount }}</span
        >，在线设备：<span style="color: green">{{ onlineDeviceCount }}</span>
      </div>
      <div class="working-hours">
        工作时间：<span style="color: pink">{{ currentTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "TopBar",
  props: {
    deviceCount: {
      type: Number,
      required: true,
    },
    onlineDeviceCount: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const currentTime = ref("");

    const updateTime = () => {
      // 获取当前时间
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      // 格式化时间
      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const formattedSeconds = seconds.toString().padStart(2, "0");

      // 更新当前时间
      currentTime.value = `${formattedHours}.${formattedMinutes}.${formattedSeconds}`;
    };

    onMounted(() => {
      // 在组件挂载后启动计时器
      setInterval(updateTime, 1000);
    });

    const deviceColor = ref("green");
    const updateDeviceColor = () => {
      // 根据在线设备数量和设备总量动态计算颜色
      deviceColor.value =
        props.onlineDeviceCount <= props.deviceCount ? "green" : "red";
    };

    onMounted(() => {
      // 在组件挂载后启动计时器
      setInterval(updateDeviceColor, 1000);
    });

    return { currentTime, deviceColor };
  },
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: flex-start; /* 左对齐 */
  align-items: center;
  background-color: #66aae6; /* 淡蓝色背景 */
  color: rgba(31, 190, 198, 0.852); /* 白色文本 */
  padding: 0 20px; /* 内边距 */
  height: 50px; /* 高度 */
}

.left-section {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  align-items: flex-start; /* 左对齐 */
}

.device-count,
.working-hours {
  font-size: 16px; /* 文本大小 */
  font-weight: bold; /* 加粗字体 */
  margin-right: 0; /* 移除右边距 */
  margin-bottom: 5px; /* 添加底部边距 */
}

.working-hours {
  margin-bottom: 0; /* 最后一个元素没有底部边距 */
}
</style>
