import { createApp } from 'vue';
import './styles/index.scss'; // 引入样式
import App from './App.vue';
// 引入ElementPlus的暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css';
// 引入路由
import router from './routers';
// 引入仓库pinia
import pinia from './stores/index.js';

// 创建app
const app = createApp(App);
// 注册路由
app.use(router);
// 注册pinia
app.use(pinia);
// 挂载
app.mount('#app');
