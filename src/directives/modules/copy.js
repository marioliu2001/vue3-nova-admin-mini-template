/*
  需求：实现点击元素复制内容到剪贴板的功能
  思路：
    1、将需要复制的内容绑定到指令上
    2、监听点击事件，调用浏览器的 Clipboard API 将内容复制到剪贴板
    3、根据复制操作的结果，显示成功或失败的消息提示

  使用：给希望触发复制功能的元素添加 v-copy 指令，并将要复制的内容作为指令的值
  <div v-copy="copyText">点击复制</div>
*/

import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';

// 定义复制指令
const copy = {
  // 指令挂载时执行
  mounted(el, binding) {
    // 将需要复制的数据绑定到元素上
    el.copyData = binding.value;

    // 定义点击事件处理函数
    el.handleClickEl = async function () {
      try {
        // 使用 Clipboard API 将数据复制到剪贴板
        await navigator.clipboard.writeText(el.copyData.toString());
        // 显示复制成功提示
        ElMessage.success('复制成功🌈');
      } catch (error) {
        // 如果复制失败，则打印错误信息并显示复制失败提示
        console.error('复制操作不被支持或失败: ', error);
        ElMessage.error('复制失败🌈');
      }
    };
    // 绑定点击事件监听器
    el.addEventListener('click', el.handleClickEl);
  },
  // 指令更新时执行
  updated(el, binding) {
    // 更新需要复制的数据
    el.copyData = binding.value;
  },
  // 指令卸载前执行
  beforeUnmount(el) {
    // 移除点击事件监听器
    el.removeEventListener('click', el.handleClickEl);
  }
};

export default copy;
