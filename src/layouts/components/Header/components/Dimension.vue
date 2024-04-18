<script setup>
import { computed } from 'vue';
import useGlobalStore from '@/stores/modules/global.js';
import { novaMsgSuccess } from '@/utils/nova.js';
import { ElementPlus } from '@element-plus/icons-vue';

const globalStore = useGlobalStore();
const dimension = computed(() => globalStore.dimension);

const dimensionList = [
  { label: '默认', value: 'default' },
  { label: '大型', value: 'large' },
  { label: '小型', value: 'small' }
];

const handleDimension = (item) => {
  if (dimension.value === item) return;
  window.location.reload();
  globalStore.setDimension(item);
  novaMsgSuccess('配置成功🌈');
};
</script>

<template>
  <el-tooltip placement="left" content="尺寸配置">
    <el-dropdown @command="handleDimension">
      <el-icon class="nova-icon mr-[18px]" :size="22"><ElementPlus /></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in dimensionList"
            :key="item.value"
            :command="item.value"
            :disabled="dimension === item.value"
          >
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-tooltip>
</template>

<style scoped></style>
