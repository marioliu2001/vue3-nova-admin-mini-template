<script setup>
// 退出全屏的叉叉按钮（右上角）
import useGlobalStore from '@/stores/modules/global.js';

const globalStore = useGlobalStore();

const handleExitMaximize = () => {
  globalStore.setGlobalState('maximize', false);
};
</script>

<template>
  <div class="maximize" @click="handleExitMaximize">
    <el-icon :size="22" class="exitIcon"><CloseBold /></el-icon>
  </div>
</template>

<style lang="scss" scoped>
.maximize {
  position: fixed;
  top: -25px;
  right: -25px;
  z-index: 999;
  width: 66px;
  height: 66px;
  cursor: pointer;
  background-color: var(--el-color-primary-light-8);
  border: 2px dashed var(--el-color-primary);
  border-radius: 50%;
  opacity: 0.9;
  &:hover {
    background-color: var(--el-color-primary-light-7);
  }
  .exitIcon {
    position: relative;
    top: 46%;
    left: 19%;
    color: var(--el-color-primary);
  }
}
</style>
