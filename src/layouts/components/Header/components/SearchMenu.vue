<script setup>
import { ref, computed, nextTick } from 'vue';
import { Search } from '@element-plus/icons-vue';

import { useRouter } from 'vue-router';
import useAuthStore from '@/stores/modules/auth.js';

const router = useRouter();
const authStore = useAuthStore();
const menuList = computed(() =>
  authStore.menuList
    .filter((item) => item.children && item.meta.isHide === '1')
    .map((item) => item.children)
    .flat()
);

// 过滤数据
const searchMenuList = (queryString, callBack) => {
  const results = queryString
    ? menuList.value.filter(filterNodeMethod(queryString))
    : menuList.value;
  callBack(results);
};

// 筛选菜单
const filterNodeMethod = (queryString) => {
  return (restaurant) => {
    return (
      restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
      restaurant.meta.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1
    );
  };
};

// 点击菜单跳转
const handleClickMenu = (menuItem) => {
  searchMenu.value = '';
  handleCloseSearch();
  if (menuItem.meta.isLink) {
    window.open(menuItem.meta.isLink, '_blank');
  } else {
    router.push(menuItem.path);
  }
};

// 打开搜索框
const isShowSearch = ref(false);
const novaMenuRef = ref();
const searchMenu = ref('');
const handleMenuOpen = () => {
  isShowSearch.value = true;
  nextTick(() => {
    setTimeout(() => {
      novaMenuRef.value.focus();
    });
  });
};

// 搜索窗关闭
const handleCloseSearch = () => {
  isShowSearch.value = false;
};
</script>

<template>
  <el-tooltip content="搜索菜单">
    <div class="menu-search-dialog">
      <el-icon class="nova-icon mr-[18px]" :size="20" @click="handleMenuOpen"><Search /></el-icon>
      <el-dialog
        v-model="isShowSearch"
        destroy-on-close
        :modal="false"
        :show-close="false"
        fullscreen
        @click="handleCloseSearch"
      >
        <el-autocomplete
          ref="novaMenuRef"
          v-model="searchMenu"
          value-key="path"
          placeholder="菜单搜索：支持菜单名称、路径 ⚡"
          :fetch-suggestions="searchMenuList"
          @select="handleClickMenu"
          @click.stop
        >
          <template #prefix>
            <el-icon>
              <Search />
            </el-icon>
          </template>
          <template #default="{ item }">
            <el-icon>
              <component :is="item.meta.icon" />
            </el-icon>
            <span> {{ item.meta.title }} </span>
          </template>
        </el-autocomplete>
      </el-dialog>
    </div>
  </el-tooltip>
</template>

<style lang="scss" scoped>
.menu-search-dialog {
  display: flex;
  align-items: center;
  :deep(.el-dialog) {
    background-color: rgb(0 0 0 / 50%);
    border-radius: 0 !important;
    box-shadow: unset !important;
    .el-dialog__header {
      border-bottom: none !important;
    }
  }
  :deep(.el-autocomplete) {
    position: absolute;
    top: 100px;
    left: 50%;
    width: 550px;
    transform: translateX(-50%);
    .el-input__wrapper {
      background-color: var(--el-bg-color);
    }
  }
}
.el-autocomplete__popper {
  .el-icon {
    position: relative;
    top: 2px;
    font-size: 16px;
  }
  span {
    margin: 0 0 0 10px;
    font-size: 14px;
  }
}
</style>
