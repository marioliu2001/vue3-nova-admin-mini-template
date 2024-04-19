<script setup>
import { ref, onBeforeUnmount } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import Collapse from './components/Collapse.vue';
import BreadCrumb from './components/BreadCrumb.vue';
import User from './components/User.vue';
import FullScreen from './components/FullScreen.vue';
import Dark from './components/Dark.vue';
import ThemeSetting from './components/ThemeSetting.vue';
import Dimension from './components/Dimension.vue';
import SearchMenu from './components/SearchMenu.vue';

/** 监听窗口大小变化，进行是否显示 */
const showTool = ref(true); // 是否显示
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;
  if (screenWidth.value < 865) {
    showTool.value = false;
  } else {
    showTool.value = true;
  }
}, 100);
window.addEventListener('resize', listeningWindow, false);
onBeforeUnmount(() => {
  window.removeEventListener('resize', listeningWindow);
});
</script>

<template>
  <div class="header">
    <div class="header-left">
      <!-- 左侧菜单展开和折叠图标 -->
      <Collapse />
      <!-- 面包屑 -->
      <BreadCrumb v-if="showTool" />
    </div>
    <div class="header-right">
      <!-- 搜索菜单 -->
      <SearchMenu v-if="showTool" />
      <!-- ElementPlus 尺寸配置 -->
      <Dimension v-if="showTool" />
      <!-- 明亮/暗黑模式图标 -->
      <Dark />
      <!-- 全屏图标 -->
      <FullScreen />
      <!-- 主题配置 -->
      <ThemeSetting v-if="showTool" />
      <!-- 头像 AND 下拉折叠 -->
      <User />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: $aside-header-height;
  .header-left {
    display: flex;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
  }
  .header-right {
    display: flex;
    align-items: center;
  }
}
</style>
