<script setup>
import { ref, useSlots, computed } from 'vue';
const table = ref();
const slots = useSlots();
const isSlotOption = computed(() => {
  return !!slots.option;
});

// Loading状态 使用defineModel从父组件接受（双向绑定）
const loading = defineModel('loading', { type: Boolean, default: false });

// 分页数据
const pageSize = defineModel('pageSize', { type: Number, default: 10 });
const pageCurrent = defineModel('pageCurrent', { type: Number, default: 1 });

// 定义表格属性
const props = defineProps({
  tableData: {
    type: Array,
    default() {
      return [];
    }
  },
  // 表格最大高度
  maxHeight: { type: String, default: '550px' },
  // 是否带有纵向边框
  border: { type: Boolean, default: false },
  // 是否多选
  selection: { type: Boolean, default: false },
  // 是否显示序号（1,2,3,4,5）
  sort: { type: Boolean, default: false },
  // 表格表头
  column: {
    type: Array,
    default() {
      return [
        {
          label: '',
          prop: '',
          type: '',
          formatter: undefined,
          width: '',
          minWidth: ''
        }
      ];
    }
  },
  // 是否显示操作模块
  option: { type: Boolean, default: false },
  // 是否显示分页
  pagination: { type: Boolean, default: false },
  // 数据总条数
  total: { type: Number, default: 100 },
  rowKey: { type: String, default: '' }
});

const emits = defineEmits([
  'edit',
  'confirm',
  'handleSizeChange',
  'handleCurrentChange',
  'currentChange',
  'selectionChange'
]);

// 点击编辑按钮
const edit = (row) => {
  console.log(row);
  emits('edit', row);
};
// 确认删除
const confirm = (row) => {
  emits('confirm', row);
};
// 分页
const handleSizeChange = (val) => {
  emits('handleSizeChange', val);
};
// 改变页码
const handleCurrentChange = (val) => {
  emits('handleCurrentChange', val);
};
// 选中单行
const currentChange = (val) => {
  emits('currentChange', val);
};
// 多行
const selectionChange = (val) => {
  emits('selectionChange', val);
};
</script>

<template>
  <div>
    <el-table
      ref="table"
      :data="tableData"
      :max-height="maxHeight"
      v-loading="loading"
      element-loading-text="正在努力加载中..."
      :border="border"
      highlight-current-row
      @current-change="currentChange"
      @selection-change="selectionChange"
      :row-key="rowKey"
    >
      <el-table-column type="selection" width="55" v-if="selection" />
      <el-table-column min-width="50" header-align="center" align="center" label="序号" v-if="sort">
        <template #default="scope">
          <span> {{ (Number(pageCurrent) - 1) * Number(pageSize) + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in column"
        :key="index"
        align="center"
        :label="item.label"
        :prop="item.prop"
        :min-width="item.minWidth"
        :formatter="item.formatter"
        show-overflow-tooltip
      >
        <!-- 如果该数据需要显示其他标签，则使用插槽显示 插槽名称就是column的prop -->
        <template #default="scope" v-if="item.type">
          <slot :name="item.prop" :row="scope.row"></slot>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" min-width="185" v-if="option">
        <template #default="scope">
          <el-link
            type="primary"
            size="small"
            @click="edit(scope.row)"
            :underline="false"
            style="margin-right: 5px"
            >编辑</el-link
          >
          <el-popconfirm title="是否删除" @confirm="confirm(scope.row)">
            <template #reference>
              <el-link type="danger" :underline="false">删除</el-link>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column
        v-if="option && isSlotOption"
        fixed="right"
        label="操作"
        align="center"
        min-width="185"
      >
        <template #default="scope">
          <slot name="option" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block" v-if="props.pagination">
      <!-- hide-on-single-page 只存在一页是隐藏分页组件-->
      <el-pagination
        v-model:current-page="pageCurrent"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
