<template>
  <div>
    <h2>设备状态</h2>
    <div v-if="status === 'normal'" class="status-normal">
      设备正常运行。
      <p>当前时间：{{ currentTime }}</p>
    </div>
    <div v-else class="status-fault">
      设备出现故障：
      <ul>
        <li v-if="temperature > 40">高温：{{ temperature }}</li>
        <li v-if="battery === 0">电量低：{{ battery }}</li>
        <li v-if="ph > 10 || ph < 2">pH 值异常：{{ ph }}</li>
      </ul>
      <p>当前时间：{{ currentTime }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "normal", // 'normal' 或 'fault'
      temperature: 35,
      battery: 80,
      ph: 7,
    };
  },
  computed: {
    currentTime() {
      return new Date().toLocaleTimeString();
    },
  },
  created() {
    // 模拟设备状态更新
    this.simulateDeviceFailure();
  },
  methods: {
    simulateDeviceFailure() {
      // 模拟设备状态更新
      setTimeout(() => {
        this.status = "fault";
        this.temperature = 45;
        this.battery = 0;
        this.ph = 12;
      }, 5000);
    },
    resetDevice() {
      // 重置设备状态为正常
      this.status = "normal";
      this.temperature = 35;
      this.battery = 80;
      this.ph = 7;
    },
  },
};
</script>

<style scoped>
.status-normal {
  color: green;
}

.status-fault {
  color: red;
}
</style>
