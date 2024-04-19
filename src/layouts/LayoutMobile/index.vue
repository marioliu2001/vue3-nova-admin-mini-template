<script setup>
import settings from '@/config/settings.js';
import User from '../components/Header/components/User.vue';
import Dark from '../components/Header/components/Dark.vue';
import Logo from '../components/Logo/index.vue';
import ColumnSubMenu from '../components/Menu/ColumnSubMenu.vue';
import Main from '../components/Main/index.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import useAuthStore from '@/stores/modules/auth.js';
import useGlobalStore from '@/stores/modules/global.js';
import { Expand } from '@element-plus/icons-vue';

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

// 动态绑定左侧菜单animate动画
const menuAnimate = ref(settings.menuAnimate);
const menuList = computed(() => authStore.showMenuList);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path));
const mobileDrawer = ref(false);
</script>

<template>
  <el-container class="layout-container">
    <el-header class="layout-header flex items-center justify-between">
      <el-icon class="collapse-icon nova-icon" :size="30" @click="mobileDrawer = true">
        <Expand />
      </el-icon>
      <div class="flex items-center">
        <!-- 明亮/暗黑模式图标 -->
        <Dark />
        <!-- 头像 AND 下拉折叠 -->
        <User />
      </div>
    </el-header>
    <el-container class="layout-main">
      <Main />
    </el-container>
  </el-container>

  <!-- 左侧抽屉菜单 -->
  <MobileDrawer style="width: 220px" v-model="mobileDrawer" placement="left">
    <div class="transition-all">
      <Logo layout="mobile" />
      <el-scrollbar class="layout-scrollbar">
        <!-- :unique-opened="true" 子菜单不能同时展开 -->
        <el-menu
          :default-active="activeMenu"
          :collapse-transition="false"
          :uniqueOpened="globalStore.uniqueOpened"
          :router="false"
          :class="menuAnimate"
        >
          <ColumnSubMenu :menuList="menuList" />
        </el-menu>
      </el-scrollbar>
    </div>
  </MobileDrawer>
</template>

<style lang="scss" scoped>
// 去除菜单右侧边框
.el-menu {
  border-right: none;
}
.layout-container {
  width: 100vw;
  height: 100vh;
  .layout-header {
    height: $aside-header-height;
    overflow: hidden;
    background-color: var(--el-header-bg-color);
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
</style>
