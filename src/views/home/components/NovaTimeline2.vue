<script setup>
const activities = [
  {
    content: 'dy热搜',
    timestamp: '2024-04-19 16:25:41',
    type: 'primary'
  },
  {
    content: '以色列袭击伊朗境内目标',
    timestamp: '2024-04-19 16:25:41',
    type: 'success'
  },
  {
    content: '一季度超1.41亿人次出入境',
    timestamp: '2024-04-19 16:25:41',
    type: 'warning'
  },
  {
    content: '长城炮是什么梗',
    timestamp: '2024-04-19 16:25:41',
    type: 'info'
  },
  {
    content: '雷军：小米暂时不做越野车',
    timestamp: '2024-04-19 16:25:41',
    type: 'danger'
  },
  {
    content: '俄军一架远程战略轰炸机坠毁',
    timestamp: '2024-04-19 16:25:41',
    type: 'primary'
  },
  {
    content: '全红婵陈芋汐世界杯摘金',
    timestamp: '2024-04-19 16:25:41',
    type: 'success'
  },
  {
    content: '专家：美介入南海妄图一箭三雕',
    timestamp: '2024-04-19 16:25:41',
    type: 'warning'
  },
  {
    content: '在12306公众号求票成功系谣言',
    timestamp: '2024-04-19 16:25:41',
    type: 'info'
  },
  {
    content: '雷军硬控小孩哥',
    timestamp: '2024-04-19 16:25:41',
    type: 'danger'
  }
];
</script>

<template>
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :type="activity.type"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline>
</template>

<style scoped lang="scss"></style>
