<script setup>
import useGlobalStore from '@/stores/modules/global.js';
import { Fold, Expand } from '@element-plus/icons-vue';
const globalStore = useGlobalStore();

// 点击切换操作
const changeCollapseIcon = () => {
  // 定义图标切换变量(true-折叠，false-展开)
  globalStore.isCollapse = globalStore.setCollapse(globalStore.isCollapse);
};
</script>

<template>
  <el-icon class="collapse-icon nova-icon" :size="20" @click="changeCollapseIcon">
    <Fold v-if="!globalStore.isCollapse" />
    <Expand v-else />
  </el-icon>
</template>

<style scoped></style>
