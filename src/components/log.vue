<template>
  <div class="log-container">
    <div v-for="(logEntry, index) in logEntries" :key="index" class="log-entry">
      <div class="log-item time">{{ logEntry.time }}</div>
      <div class="log-item device-id">{{ logEntry.deviceId }}</div>
      <div class="log-item battery-level">{{ logEntry.batteryLevel }}%</div>
      <div class="log-item oxygen-level">{{ logEntry.oxygenLevel }}%</div>
      <div class="log-item temperature">{{ logEntry.temperature }}°C</div>
      <div class="log-item ph-value">{{ logEntry.phValue }}</div>
      <div class="log-item coordinates">{{ logEntry.coordinates }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "log",
  data() {
    return {
      logEntries: [
        {
          time: "2024-07-18 12:00:00",
          deviceId: "001",
          batteryLevel: 85,
          oxygenLevel: 21,
          temperature: 25,
          phValue: 7.2,
          coordinates: "40.7128,-74.0060",
        },
        {
          time: "2024-07-18 12:05:00",
          deviceId: "002",
          batteryLevel: 90,
          oxygenLevel: 22,
          temperature: 24,
          phValue: 7.3,
          coordinates: "34.0522,-118.2437",
        },
        // 可以继续添加更多日志条目
      ],
    };
  },
};
</script>

<style scoped>
.log-container {
  /* 样式根据需要添加 */
}

.log-entry {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
}

.log-item {
  /* 样式根据需要添加 */
}

.time {
  /* 样式根据需要添加 */
}

.device-id {
  /* 样式根据需要添加 */
}

.battery-level {
  /* 样式根据需要添加 */
}

.oxygen-level {
  /* 样式根据需要添加 */
}

.temperature {
  /* 样式根据需要添加 */
}

.ph-value {
  /* 样式根据需要添加 */
}

.coordinates {
  /* 样式根据需要添加 */
}
</style>
