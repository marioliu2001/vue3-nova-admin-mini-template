<script setup>
import mittBus from '@/utils/mittBus.js';
// 打开主题配置
const handleThemeDialog = () => {
  mittBus.emit('handleThemeConfig');
};
</script>

<template>
  <el-tooltip content="主题配置">
    <el-icon class="nova-icon mr-[18px]" :size="20" @click="handleThemeDialog">
      <Setting />
    </el-icon>
  </el-tooltip>
</template>

<style scoped></style>
