<template>
  <div class="map-container">
    <baidu-map
      class="map"
      :center="{ lng: centerLng, lat: centerLat }"
      :zoom="10"
      :scroll-wheel-zoom="true"
      @ready="mapReady"
    >
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        @locationSuccess="locationSuccess"
      ></bm-geolocation>
      <bm-marker
        v-for="device in devices"
        :key="device.id"
        :position="{ lng: device.lng, lat: device.lat }"
        @click="selectDevice(device)"
      >
        <bm-label
          :content="device.name"
          :labelStyle="{ color: 'red', fontSize: '12px' }"
          :offset="{ width: 20, height: -10 }"
        />
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      centerLng: 114.3, // 湖北省中心经度
      centerLat: 30.6, // 湖北省中心纬度
      devices: [],
    };
  },
  mounted() {
    this.generateDevices(50);
  },
  methods: {
    mapReady({ BMap, map }) {
      this.map = map;
    },
    locationSuccess(e) {
      this.centerLng = e.point.lng;
      this.centerLat = e.point.lat;
    },
    generateDevices(count) {
      const bounds = this.getBoundsHubei();
      const statuses = ["正常", "警告", "离线"];
      for (let i = 0; i < count; i++) {
        this.devices.push({
          id: i + 1,
          name: `设备${i + 1}`,
          lng: Math.random() * (bounds.maxX - bounds.minX) + bounds.minX,
          lat: Math.random() * (bounds.maxY - bounds.minY) + bounds.minY,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          battery: Math.floor(Math.random() * 100),
        });
      }
    },
    getBoundsHubei() {
      return {
        minX: 108.9,
        maxX: 116.05,
        minY: 29.3,
        maxY: 33.15,
      };
    },
    selectDevice(device) {
      // 触发一个自定义事件，将选中的设备信息传递给父组件
      this.$emit("device-selected", device);
    },
  },
};
</script>

<style>
.map-container {
  width: 100%;
  height: 500px;
}

.map {
  width: 100%;
  height: 100%;
}
</style>
