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
import { getCurrentInstance } from "vue";

const DEVICE_STATUS_COLORS = {
  轻微: "green",
  中度: "orange",
  严重: "red",
};

export default {
  props: {
    // 接收父组件传递的设备信息和地图中心点经纬度
    devices: {
      type: Array,
      default: () => [],
    },
    centerLng: {
      type: Number,
      default: 114.3,
    },
    centerLat: {
      type: Number,
      default: 30.6,
    },
  },
  setup(props) {
    let map = null;
    const { emit } = getCurrentInstance();
    // 地图加载完成时的回调函数
    const mapReady = ({ BMap, map: mapInstance }) => {
      map = mapInstance;
    };
    // 地理位置获取成功时的回调函数
    const locationSuccess = (e) => {
      emit("locationSelected", e.address);
    };
    // 点击设备标记时打开信息窗口
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

        // 将位置信息通过emit方法传递给父组件
        emit("locationSelected", device.location);
      });
    };

    // 根据设备状态获取标记颜色
    const getMarkerColor = (status) => {
      return DEVICE_STATUS_COLORS[status] || "gray";
    };

    return {
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
