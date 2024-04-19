<script setup>
import User from './User.vue';
import FullScreen from './FullScreen.vue';
import Dark from './Dark.vue';
import ThemeSetting from './ThemeSetting.vue';
import Dimension from './Dimension.vue';
import SearchMenu from './SearchMenu.vue';
</script>

<template>
  <div class="header-right">
    <!-- 搜索菜单 -->
    <SearchMenu />
    <!-- ElementPlus 尺寸配置 -->
    <Dimension />
    <!-- 明亮/暗黑模式图标 -->
    <Dark />
    <!-- 全屏图标 -->
    <FullScreen />
    <!-- 主题配置 -->
    <ThemeSetting />
    <!-- 头像 AND 下拉折叠 -->
    <User />
  </div>
</template>

<style lang="scss" scoped>
.header-right {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
