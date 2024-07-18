<template>
  <div class="top-bar">
    <div class="left-section">
      <div class="device-count">设备数量：{{ deviceCount }}</div>
      <div class="working-hours">工作时间：{{ workingHours }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  data() {
    return {
      deviceCount: 150, // 模拟设备数量
      workingHours: "09:00 - 17:00", // 模拟工作时间
    };
  },
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: flex-start; /* 左对齐 */
  align-items: center;
  background-color: #333; /* 深色背景 */
  color: white; /* 白色文本 */
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
