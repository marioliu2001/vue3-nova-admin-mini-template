<script setup>
import { ref } from 'vue';
import { Local, Session } from '@/utils/storage.js';
import { LOGIN_URL } from '@/config';
import { useRouter } from 'vue-router';

const router = useRouter();

// 退出登录
const handleLayout = () => {
  Local.clear();
  Session.clear();
  // 必须使用这个把页面缓存刷掉
  window.location.replace(LOGIN_URL);
};
// 用户头像
const avatar = ref('https://cn.vitejs.dev/logo-with-shadow.png');
const errorAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
// 下拉折叠
const handleCommand = (command) => {
  switch (command) {
    case 'novaMine':
      router.push('/system/personage');
      break;
    case 'logout':
      handleLayout();
      break;
  }
};
</script>

<template>
  <el-image class="w-[34px] h-[34px] rounded-full select-none user-avatar" :src="avatar">
    <template #error>
      <el-image class="w-[34px] h-[34px] rounded-full select-none user-avatar" :src="errorAvatar" />
    </template>
  </el-image>
  <el-dropdown class="ml-[10px]" :hide-on-click="false" @command="handleCommand">
    <div class="nova-dropdown">
      Vite(管理员)
      <el-icon><arrow-down /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="novaMine">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
// dropdown字体颜色
.nova-dropdown {
  color: var(--el-color-primary);
  white-space: nowrap; /* 不换行 */
  cursor: pointer;
  outline: none; // 去除伪元素
}
</style>
