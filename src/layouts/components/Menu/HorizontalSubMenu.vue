<script setup>
import HorizontalSubMenu from './HorizontalSubMenu.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// 获取父组件传递过来的数据
defineProps(['menuList']);

// 打开外部标签页
const handleMenuIsLink = (value) => {
  if (value.meta?.isLink) return window.open(value.meta.isLink, '_blank');
  router.push(value.path);
};
</script>

<template>
  <template v-for="item in menuList" :key="item.path">
    <!--有下级，用el-sub-menu，无下级用el-menu-item -->
    <el-sub-menu v-if="item.children?.length" :index="item.path" v-show="item.meta.isHide === '1'">
      <template #title>
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span v-text="item.meta.title"></span>
      </template>
      <HorizontalSubMenu :menuList="item.children" />
    </el-sub-menu>
    <!--无子项-->
    <el-menu-item
      v-else
      :index="item.path"
      v-show="item.meta.isHide === '1'"
      @click="handleMenuIsLink(item)"
    >
      <el-icon v-if="item.meta.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <template #title>
        <span v-text="item.meta.title"></span>
      </template>
    </el-menu-item>
  </template>
</template>

<style scoped></style>
