import { createApp } from 'vue';
import './styles/index.scss'; // 引入样式
import App from './App.vue';
// 引入ElementPlus所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// 引入ElementPlus的暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css';
// 引入路由
import router from './routers';
// 引入仓库pinia
import pinia from './stores/index.js';
// 引入全局组件配置
import NovaComponents from '@/components/index.js';
// 引入全局自定义指令
import NovaDirectives from '@/directives/index';

// 创建app
const app = createApp(App);
// 注册ElementPlus所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 注册路由
app.use(router);
// 注册pinia
app.use(pinia);
// 注册自定义组件
app.use(NovaComponents);
// 注册全局自定义指令
app.use(NovaDirectives);

// 挂载
app.mount('#app');
