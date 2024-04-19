<script setup>
import settings from '@/config/settings.js';
import Logo from '../components/Logo/index.vue';
import Header from '../components/Header/index.vue';
import AsideSubMenu from '../components/Menu/AsideSubMenu.vue';
import Main from '../components/Main/index.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import useAuthStore from '@/stores/modules/auth.js';
import useGlobalStore from '@/stores/modules/global.js';

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

// console.log("左侧路由", authStore.showMenuList);

// 动态绑定左侧菜单animate动画
const menuAnimate = ref(settings.menuAnimate);
const menuList = computed(() => authStore.showMenuList);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));
const menuHoverCollapse = ref(settings.asideMenuHoverCollapse);
</script>

<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <Logo :layout="globalStore.layout" />
      <Header class="header" />
    </el-header>
    <el-container class="layout-aside">
      <el-aside
        class="aside transition-all"
        :style="{
          width: !globalStore.isCollapse
            ? globalStore.menuWidth + 'px'
            : settings.asideMenuCollapseWidth
        }"
      >
        <el-scrollbar class="layout-scrollbar">
          <!-- :unique-opened="true" 子菜单不能同时展开 -->
          <el-menu
            :default-active="activeMenu"
            :collapse="globalStore.isCollapse"
            :collapse-transition="false"
            :uniqueOpened="globalStore.uniqueOpened"
            :router="false"
            :class="menuAnimate"
          >
            <AsideSubMenu :menuList="menuList" />
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container class="layout-main">
        <Main />
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  .layout-aside {
    overflow: hidden;
    background-color: var(--el-menu-bg-color);
    .aside {
      z-index: $layout-aside-z-index; // 左侧菜单层级
      padding-right: $aside-menu-padding-right; // 左侧布局右边距（用于悬浮和选中更明显）
      padding-left: $aside-menu-padding-left; // 左侧布局左边距（用于悬浮和选中更明显）
      border-right: none;
      box-shadow: $aside-menu-box-shadow; // 左侧布局右边框阴影
    }
  }
  .layout-header {
    display: flex;
    height: $aside-header-height;
    overflow: hidden;
    background-color: var(--el-header-bg-color);
    .header {
      flex: 1; // 剩余空间全占满
    }
  }
  .layout-main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0;
    overflow-x: hidden;
    background-color: var(--el-bg-color);
  }
}
.layout-scrollbar {
  width: 100%;
  height: calc(100vh - $aside-header-height);
}

// 去除菜单右侧边框
.el-menu {
  border-right: none;
}
</style>

<style lang="scss">
/** 菜单悬浮折叠宽度 */
.el-menu--collapse {
  width: v-bind(menuHoverCollapse) !important;
}
</style>
