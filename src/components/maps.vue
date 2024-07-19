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
        @click="openInfoWindow(device)"
      >
        <bm-label
          :content="device.name"
          :labelStyle="{
            color: device.status === '正常' ? 'green' : 'red',
            fontSize: '12px',
          }"
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
          meid: `MEID${i + 1}`, // 添加 MEID 属性
          mobile: `1380${i + 1}`, // 添加手机号属性
          osVersion: `v${Math.floor(Math.random() * 5)}.${Math.floor(
            Math.random() * 10
          )}`, // 添加版本属性
          perCpu: `${Math.floor(Math.random() * 100)}%`, // 添加 CPU 性能属性
          perRam: `${Math.floor(Math.random() * 100)}%`, // 添加 RAM 性能属性
          perDisk: `${Math.floor(Math.random() * 100)}%`, // 添加 DISK 性能属性
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
    openInfoWindow(device) {
      const opts = {
        width: 300, // 信息窗口宽度
        height: 150, // 信息窗口高度
        title: "设备信息", // 信息窗口标题
        message: "",
      };
      const infoWindowContent = `
        <span style='display:inline-block;width:60px; text-align: right;font-weight:700'>MEID：</span>${device.meid}<br/>
        <span style='display:inline-block;width:60px; text-align: right;font-weight:700'>设备编号：</span>${device.mobile}<br/>
        <span style='display:inline-block;width:60px; text-align: right;font-weight:700'>状态：</span>${device.status}<br/>
        <span style='display:inline-block;width:60px; text-align: right;font-weight:700'>版本：</span>${device.osVersion}<br/>
        <span style='display:inline-block;width:60px; text-align: right;font-weight:700'>性能：</span>CPU: ${device.perCpu} RAM: ${device.perRam} DISK: ${device.perDisk}
      `;
      const point = new BMap.Point(device.lng, device.lat);
      const infoWindow = new BMap.InfoWindow(infoWindowContent, opts);
      this.map.openInfoWindow(infoWindow, point);
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
