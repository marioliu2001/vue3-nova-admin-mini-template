/*
 * 自动调整表格高度
 * 使用方法:
 *  在el-table上加上属性 v-adaptive="{ bottom: 32 }"
 */
// 初始设置表格高度
const setTableHeight = (el, binding) => {
  // 获取元素距离页面顶部的距离
  const top = el.offsetTop;
  // 如果binding.value存在且提供了bottom值，则使用该值；否则默认为80
  const bottom =
    binding.value && typeof binding.value.bottom !== 'undefined' ? binding.value.bottom : 80;
  // 获取当前窗口的内部高度
  const pageHeight = window.innerHeight;
  // 设置元素的高度，使其高度等于窗口高度减去元素顶部的距离和底部的距离
  el.style.height = `${pageHeight - top - bottom}px`;
  // 设置元素的垂直滚动
  el.style.overflowY = 'auto';
};

// 定义一个自适应高度的Vue指令对象
const resizeDirective = {
  // 当指令绑定到元素上时调用
  mounted(el, binding) {
    // 创建一个调整大小的监听器函数
    el.resizeListener = () => {
      // 使用requestAnimationFrame来确保在下次重绘之前执行高度调整
      requestAnimationFrame(() => {
        setTableHeight(el, binding);
      });
    };

    // 首次挂载时设置表格高度
    setTableHeight(el, binding);
    // 监听窗口大小变化事件，并绑定resizeListener
    window.addEventListener('resize', el.resizeListener);
  },
  // 当指令从元素上解绑时调用
  unmounted(el) {
    // 移除窗口大小变化事件的监听器
    window.removeEventListener('resize', el.resizeListener);
  },
  // 当绑定元素的父组件更新时调用
  updated(el, binding) {
    // 确保更新后重新设置表格高度
    requestAnimationFrame(() => {
      setTableHeight(el, binding);
    });
  }
};

export default resizeDirective;
