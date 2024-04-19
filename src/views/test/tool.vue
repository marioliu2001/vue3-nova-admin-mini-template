<script setup>
import { ref } from 'vue';
const handleDebounceBtn = () => {
  console.log('防抖');
};
const text = ref('这是要复制的内容');
</script>

<template>
  <div>
    <el-button type="primary" plain v-debounce:500="handleDebounceBtn">按钮防抖指令</el-button>
    <el-button type="primary" plain v-throttle:10000="handleThrottleBtn">按钮节流指令</el-button>
    <el-button type="primary" plain v-copy="text">点我复制</el-button>
    {{ text }}
  </div>
</template>

<style scoped lang="scss"></style>
