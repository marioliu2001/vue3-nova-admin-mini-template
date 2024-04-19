<script setup>
const activities = [
  {
    content: '开发了全新的AI智能助手，帮助用户提升工作效率！',
    timestamp: '2024-04-18 09:30:00',
    type: 'primary'
  },
  {
    content: '推出了全球首款VR游戏，震撼上线！',
    timestamp: '2024-04-17 15:45:00',
    type: 'success'
  },
  {
    content: '发布了最新版本的操作系统，全面升级用户体验！',
    timestamp: '2024-04-16 12:00:00',
    type: 'warning'
  },
  {
    content: '举办了全球顶尖科技峰会，汇聚行业精英！',
    timestamp: '2024-04-15 10:20:00',
    type: 'info'
  },
  {
    content: '携手国际慈善机构，共同助力贫困地区教育事业！',
    timestamp: '2024-04-13 14:10:00',
    type: 'danger'
  },
  {
    content: '发布了全新的智能家居产品系列，让生活更智能便捷！',
    timestamp: '2024-04-12 11:20:00',
    type: 'primary'
  },
  {
    content: '开展了大型科技创新竞赛，挖掘未来科技之星！',
    timestamp: '2024-04-11 16:40:00',
    type: 'success'
  },
  {
    content: '成功推出了自主研发的量子计算机，引领量子科技时代！',
    timestamp: '2024-04-10 13:15:00',
    type: 'warning'
  },
  {
    content: '与国际知名车企达成战略合作，共谋产业未来！',
    timestamp: '2024-04-09 09:55:00',
    type: 'info'
  },
  {
    content: '举办了全球大数据论坛，探讨数据驱动新时代！',
    timestamp: '2024-04-08 14:30:00',
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
