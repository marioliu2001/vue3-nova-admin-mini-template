<script setup>
import { getDayText } from '@/utils/random.js';
import { novaNoticeSuccess } from '@/utils/nova.js';
import { storeToRefs } from 'pinia';
import useGlobalStore from '@/stores/modules/global.js';
import NovaCard from './components/NovaCard.vue';
import NovaLeftChart from './components/NovaLeftChart.vue';
import NovaRightChart from './components/NovaRightChart.vue';
import NovaTimeline1 from './components/NovaTimeline1.vue';
import NovaTimeline2 from './components/NovaTimeline2.vue';
import { onMounted, reactive, watch } from 'vue';
onMounted(() => {
  // 时间问候语
  novaNoticeSuccess(getDayText(), '欢迎回来~');
});

// 头像
const avatar = 'https://vitejs.dev/logo-with-shadow.png';

// Gitee地址
const handleGitee = () => {
  window.open('', '_blank');
};

// GitHub地址
const handleGitHub = () => {
  window.open('', '_blank');
};

// 水印颜色
const globalStore = useGlobalStore();
const font = reactive({
  color: 'rgba(0, 0, 0, .15)'
});
const { isDark } = storeToRefs(globalStore);
watch(
  isDark,
  () => {
    font.color = isDark.value ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)';
    console.log(font.color);
  },
  {
    immediate: true
  }
);
</script>

<template>
  <div class="p-[6px]">
    <!--最上面-->
    <el-card class="rounded-md dark:bg-black" shadow="hover">
      <el-watermark :font="font" :content="['VUE3', 'Vue Nova Admin']">
        <div class="flex items-center">
          <img class="w-[60px] h-[60px] rounded-full select-none" :src="avatar" alt="avatar" />
          <div class="pl-[20px]">
            <div class="font-bold pb-[8px] whitespace-nowrap">
              <span>NOVA-ADMIN🌈</span><span class="c-#409EFF" @click="handleGitee">[Gitee]</span
              ><span>/</span><span class="c-orange" @click="handleGitHub">[GitHub]</span>
            </div>
            <div class="font-bold">
              我的老班长曾经跟我说过，你想拥有你从未有过的东西，那么你必须去做，你从未做过的事情！🌈
            </div>
          </div>
        </div>
      </el-watermark>
    </el-card>
    <!--四个数字显示Card-->
    <NovaCard />
    <!--左右图表-->
    <el-row :gutter="20" class="">
      <!-- 注意：如果不进行操作数组，使用index当key没有问题，若是数组会用来增删改查则不能使用index当key。 -->
      <el-col :span="12" :lg="12" :md="12" :sm="24" :xs="24">
        <el-card class="rounded-md dark:bg-black" shadow="hover">
          <NovaLeftChart />
        </el-card>
      </el-col>
      <el-col :span="12" :lg="12" :md="12" :sm="24" :xs="24">
        <el-card class="rounded-md dark:bg-black" shadow="hover">
          <NovaRightChart />
        </el-card>
      </el-col>
    </el-row>
    <!--最下方时间线-->
    <el-row :gutter="20" class="mt-[5px]">
      <!-- 注意：如果不进行操作数组，使用index当key没有问题，若是数组会用来增删改查则不能使用index当key。 -->
      <el-col :span="12" :lg="12" :md="12" :sm="24" :xs="24">
        <el-card class="rounded-md dark:bg-black" shadow="hover">
          <NovaTimeline1 />
        </el-card>
      </el-col>
      <el-col :span="12" :lg="12" :md="12" :sm="24" :xs="24">
        <el-card class="rounded-md dark:bg-black" shadow="hover">
          <NovaTimeline2 />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped></style>
