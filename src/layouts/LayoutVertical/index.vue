<script setup>
import settings from '@/config/settings.js';
import Logo from '../components/Logo/index.vue';
import Header from '..//components/Header/index.vue';
import AsideSubMenu from '..//components/Menu/AsideSubMenu.vue';
import Main from '../components/Main/index.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import useAuthStore from '@/stores/modules/auth.js';
import useGlobalStore from '@/stores/modules/global.js';

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();
// console.log('纵向布局左侧路由', authStore.showMenuList);

// 动态绑定左侧菜单animate动画
const menuAnimate = ref(settings.menuAnimate); // 菜单动画设置
const menuList = computed(() => authStore.showMenuList); // 计算属性，获取左侧菜单数据
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path)); // 计算属性，获取当前活动菜单路径
const menuHoverCollapse = ref(settings.asideMenuHoverCollapse); // 左侧菜单悬浮折叠宽度
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单栏 -->
    <el-aside
      class="layout-aside transition-all"
      :style="{
        width: !globalStore.isCollapse
          ? globalStore.menuWidth + 'px' // 非折叠状态下的菜单宽度
          : settings.asideMenuCollapseWidth // 折叠状态下的菜单宽度
      }"
    >
      <!-- Logo 组件 -->
      <Logo :isCollapse="globalStore.isCollapse" :layout="globalStore.layout" />
      <!-- 左侧菜单滚动容器 -->
      <el-scrollbar class="layout-scrollbar">
        <!-- 左侧菜单 -->
        <!-- :unique-opened="true" 子菜单不能同时展开 -->
        <el-menu
          :default-active="activeMenu"
          :collapse="globalStore.isCollapse"
          :collapse-transition="false"
          :uniqueOpened="globalStore.uniqueOpened"
          :router="false"
          :class="menuAnimate"
        >
          <!-- 左侧菜单子菜单 -->
          <AsideSubMenu :menuList="menuList" />
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <!-- 页面主体部分 -->
    <el-container>
      <!-- 头部 -->
      <el-header class="layout-header">
        <Header />
      </el-header>
      <!-- 主体内容 -->
      <el-main class="layout-main">
        <Main />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /* 左侧菜单栏样式 */
  .layout-aside {
    z-index: $layout-aside-z-index; // 左侧菜单层级
    padding-right: $aside-menu-padding-right; // 左侧布局右边距（用于悬浮和选中更明显）
    padding-left: $aside-menu-padding-left; // 左侧布局左边距（用于悬浮和选中更明显）
    background-color: var(--el-menu-bg-color); // 背景色
    border-right: none;
    box-shadow: $aside-menu-box-shadow; // 左侧布局右边框阴影
  }
  /* 页面顶部头部样式 */
  .layout-header {
    height: $aside-header-height;
    background-color: var(--el-header-bg-color);
  }
  /* 页面主体区域样式 */
  .layout-main {
    box-sizing: border-box;
    padding: 0;
    overflow-x: hidden;
    background-color: var(--el-bg-color);
  }
}

// 去除菜单右侧边框
.el-menu {
  border-right: none;
}
/* 左侧菜单滚动条样式 */
.layout-scrollbar {
  width: 100%;
  height: calc(100vh - $aside-header-height);
}
</style>

<style lang="scss">
/** 菜单悬浮折叠宽度 */
.el-menu--collapse {
  width: v-bind(menuHoverCollapse) !important;
}
</style>
