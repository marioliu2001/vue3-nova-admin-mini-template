import { createApp } from 'vue';
import './styles/index.scss'; // 引入样式
import App from './App.vue';
// 引入仓库pinia
import pinia from './stores/index.js';

// 创建app
const app = createApp(App);
// 注册pinia
app.use(pinia);
// 挂载
app.mount('#app');
