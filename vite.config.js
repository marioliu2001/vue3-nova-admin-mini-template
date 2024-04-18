import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  // env文件目录
  envDir: 'env',
  plugins: [
    vue(),
    // 自动导入组件，无需手动引入
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      '~': path.resolve('./src')
    }
  },
  css: {
    // css全局变量使用，@/styles/variable.scss文件
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@use "./src/styles/variable.scss" as *;`
      }
    }
  }
});
