<script setup>
import axios from 'axios';
import { reactive, watch, ref, onMounted } from 'vue';
import { useTransition } from '@vueuse/core';
import useGlobalStore from '@/stores/modules/global.js';
import { storeToRefs } from 'pinia';
import { novaMsgSuccess } from '@/utils/nova.js';

const activities = ref([]);
const active_time = ref();

const handleGetHot = () => {
  axios
    .get(
      'https://www.iesdouyin.com/web/api/v2/hotsearch/billboard/word/?reflow_source=reflow_page&web_id=7355881986718860851&device_id=7355881986718860851&msToken=VM4s1IovTT3wQbMXurvFg3JLN8qgM53zW_4iqA9CVuoMufduYZU4NNrNzdbFKfQ6hd9UdWecyt87AwRm_6Y_a-aD6drp-vZVi4Bg6p3GQV5mu4NVXOiz&a_bogus=xvsdDOh-Msm19jvSMhkz97Um0dS0YW-ogZEFdf6cw0wB'
    )
    .then((res) => {
      console.log(res);
      active_time.value = res.data.active_time;
      activities.value = res.data.word_list;
      source.value = res.data.word_list.length;
      novaMsgSuccess('数据更新成功');
    });
};

// 水印颜色
const globalStore = useGlobalStore();
const { isDark } = storeToRefs(globalStore);
const font = reactive({
  color: 'rgba(0, 0, 0, .15)'
});
watch(
  isDark,
  () => {
    font.color = isDark.value ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)';
  },
  {
    immediate: true
  }
);

const source = ref(0);
const outputValue = useTransition(source, {
  duration: 1700
});

onMounted(() => {
  handleGetHot();
});
</script>

<template>
  <div>
    <div class="flex items-center justify-center">
      <span class="text-5xl font-bold text-red-500 mr-1 transform scale-125">抖</span>
      <span class="text-5xl font-bold text-yellow-500 mr-1 transform scale-125">音</span>
      <span
        class="text-6xl font-bold text-blue-500 mr-1 transform scale-125 animate__animated animate__tada"
        >热</span
      >
      <span class="text-5xl font-bold text-green-500 mr-1 transform scale-125">搜</span>
      <el-button type="primary" plain v-debounce="handleGetHot" class="ml-2">更新热搜</el-button>
    </div>

    <el-statistic class="text-center mt-2" title="热搜数量(条)" :value="outputValue" />
    <div class="mb-3 mt-2 text-center">更新时间：{{ active_time }}</div>

    <el-watermark style="min-height: calc(100vh - 88px)" :font="font" :content="['抖音', 'tiktok']">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="`热力值 ` + activity.hot_value"
          type="danger"
        >
          {{ activity.word }}
        </el-timeline-item>
      </el-timeline>
    </el-watermark>
  </div>
</template>

<style scoped lang="scss"></style>
