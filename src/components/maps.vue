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
            color: getMarkerColor(device.status),
            fontSize: '12px',
          }"
          :offset="{ width: 20, height: -10 }"
        />
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import { onMounted, ref, computed } from "vue";

const DEVICE_STATUS_COLORS = {
  正常: "green",
  警告: "orange",
  故障: "red",
};

export default {
  setup() {
    const centerLng = ref(114.3);
    const centerLat = ref(30.6);
    const devices = ref([]);
    let map = null;

    onMounted(() => {
      generateDevices(50);
    });

    // 使用 computed 计算湖北省边界
    const hubeiBounds = computed(() => ({
      minX: 108.9,
      maxX: 116.05,
      minY: 29.3,
      maxY: 33.15,
    }));

    const mapReady = ({ BMap, map: mapInstance }) => {
      map = mapInstance;
    };

    const locationSuccess = (e) => {
      centerLng.value = e.point.lng;
      centerLat.value = e.point.lat;
    };

    const generateDevices = (count) => {
      const { minX, maxX, minY, maxY } = hubeiBounds.value;
      const statuses = Object.keys(DEVICE_STATUS_COLORS);

      for (let i = 0; i < count; i++) {
        devices.value.push({
          id: i + 1,
          name: `设备${i + 1}`,
          lng: Math.random() * (maxX - minX) + minX,
          lat: Math.random() * (maxY - minY) + minY,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          battery: Math.floor(Math.random() * 100),
          mobile: `10086${i + 1}`,
          osVersion: `v${Math.floor(Math.random() * 5)}.${Math.floor(
            Math.random() * 10
          )}`,
          temperature: `${Math.floor(Math.random() * 20) + 20}°C`,
          phValue: `${(Math.random() * 5 + 6).toFixed(1)}`,
          oxygenSaturation: `${(Math.random() * 10 + 90).toFixed(1)}%`,
          // 初始化位置信息为空
          location: "",
        });
      }
    };

    const openInfoWindow = (device) => {
      const opts = {
        width: 350,
        height: 230, // 调整高度以适应新增信息
        title: "设备信息",
      };

      // 使用百度地图逆地理编码服务获取位置信息
      const geocoder = new BMap.Geocoder();
      const point = new BMap.Point(device.lng, device.lat);
      geocoder.getLocation(point, (rs) => {
        const addComp = rs.addressComponents;
        device.location = `${addComp.province}${addComp.city}${addComp.district}${addComp.street}${addComp.streetNumber}`;

        // 在获取到位置信息后创建信息窗口
        const infoWindowContent = `
          <div class="info-window">
            <div><span>名称：</span>${device.name}</div>
            <div><span>电量：</span>${device.battery}%</div>
            <div><span>状态：</span>${device.status}</div>
            <div><span>版本：</span>${device.osVersion}</div>
            <div><span>温度：</span>${device.temperature}</div>
            <div><span>PH：</span>${device.phValue}</div>
            <div><span>含氧：</span>${device.oxygenSaturation}</div>
            <div><span>位置：</span>${device.location}</div>
          </div>
        `;
        const infoWindow = new BMap.InfoWindow(infoWindowContent, opts);
        map.openInfoWindow(infoWindow, point);
      });
    };

    const getMarkerColor = (status) => {
      return DEVICE_STATUS_COLORS[status] || "gray";
    };

    return {
      centerLng,
      centerLat,
      devices,
      mapReady,
      locationSuccess,
      openInfoWindow,
      getMarkerColor,
    };
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

/* 优化信息窗口样式 */
.info-window {
  font-size: 14px;
}

.info-window div {
  margin-bottom: 5px;
}

.info-window span {
  display: inline-block;
  width: 60px;
  text-align: right;
  font-weight: 700;
}
</style>
