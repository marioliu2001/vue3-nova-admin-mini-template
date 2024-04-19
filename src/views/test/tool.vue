<script setup>
const handleBtn = () => {
  console.log('防抖');
};
</script>

<template>
  <div>
    <el-button type="primary" plain v-debounce:500="handleBtn">按钮防抖指令</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
