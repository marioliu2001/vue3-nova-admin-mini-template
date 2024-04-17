import { createApp } from 'vue';
import './styles/index.scss'; // 引入样式
import App from './App.vue';

// 创建app
const app = createApp(App);
// 挂载
app.mount('#app');
