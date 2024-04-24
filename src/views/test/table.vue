<script setup>
import NovaTable from '@/components/NovaTable/index.vue';
import { ref } from 'vue';
import { Session } from '@/utils/storage.js';

// 定义loading状态
const isLoading = ref(false);

// 点击加载按钮后改变loading状态
const changLoading = () => {
  isLoading.value = !isLoading.value;
};

// 表格数据
const pageSize = ref(Session.get('testPageSize')?.pageSize);
const pageCurrent = ref(Session.get('testPageCurrent')?.pageCurrent);

// 页面条数改变后触发
const handleSizeChange = (val) => {
  Session.set('testPageSize', { pageSize: val });
};
// 当前页改变后触发
const handleCurrentChange = (val) => {
  Session.set('testPageCurrent', { pageCurrent: val });
};

// 表格数据
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address1: 'No. 189, Grove St, Los Angeles',
    address2: 'No. 189, Grove St, Los Angeles',
    address3: 'No. 189, Grove St, Los Angeles'
  }
];

// 表格表头
const column = [
  { label: '时间', prop: 'date' },
  { label: '名字', prop: 'name' },
  { label: '地址1', prop: 'address1' },
  { label: '地址2', prop: 'address2' },
  { label: '地址3', prop: 'address3' }
];
</script>

<template>
  <div>
    <el-button type="primary" @click="changLoading">加载</el-button>
    <NovaTable
      v-model:loading="isLoading"
      :tableData="tableData"
      :column="column"
      :sort="false"
      :pagination="true"
      :option="true"
      @handle-size-change="handleSizeChange"
      @handle-current-change="handleCurrentChange"
      v-model:pageSize="pageSize"
      v-model:pageCurrent="pageCurrent"
      :total="tableData.length"
    >
      <!--<template #status="row">-->
      <!--  &lt;!&ndash; 可写其他标签样式，这里只是展示 &ndash;&gt;-->
      <!--  <span>{{ row.row }}</span>-->
      <!--</template>-->
      <!--<template #option="row">-->
      <!--  &lt;!&ndash; 可写其他操作样式，这里只是展示 &ndash;&gt;-->
      <!--  <span>{{ row.row }}</span>-->
      <!--</template>-->
    </NovaTable>
  </div>
</template>

<style scoped lang="scss"></style>
