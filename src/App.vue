<script setup>
import { onMounted, computed } from 'vue';
// import { useI18n } from 'vue-i18n';
import { getBrowserLang } from '@/utils/index.js';
import { useTheme } from '@/utils/theme.js';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

import useGlobalStore from '@/stores/modules/global.js';
const globalStore = useGlobalStore();

// 计算Element-Plus尺寸
const dimension = computed(() => globalStore.dimension);
const { initThemeConfig } = useTheme();

// 初始化语言
// const i18n = useI18n();
onMounted(() => {
  const language = globalStore.language ?? getBrowserLang();
  // i18n.locale.value = language;
  globalStore.setGlobalState('language', language);
});

// 语言配置
const locale = computed(() => {
  if (globalStore.language === 'zh') return zhCn;
  if (globalStore.language === 'en') return en;
  return getBrowserLang() === 'zh' ? zhCn : en;
});

// 初始化主题配置
initThemeConfig();
</script>

<template>
  <el-config-provider :locale="locale" :size="dimension">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
