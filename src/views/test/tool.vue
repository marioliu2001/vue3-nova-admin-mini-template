<script setup>
const handleDebounceBtn = () => {
  console.log('防抖');
};
const handleThrottleBtn = () => {
  console.log('节流');
};
</script>

<template>
  <div>
    <el-button type="primary" plain v-debounce:500="handleDebounceBtn">按钮防抖指令</el-button>
    <el-button type="primary" plain v-throttle:10000="handleThrottleBtn">按钮节流指令</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
