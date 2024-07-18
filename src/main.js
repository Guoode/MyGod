import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import BaiduMap from 'vue-baidu-map-3x'

const app = createApp(App);
app.use(BaiduMap, {
  ak: 'ERJaT2zREz57EesvlgMEX0fp7aMP1p8k',
});
// 挂载应用实例到 DOM
app.mount('#app');
