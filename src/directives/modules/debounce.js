/**
 * v-debounce
 * 按钮防抖指令
 * 防抖就是在行为触发执行一次后，需静默等待N秒后才能再次执行，在此期间不能再触发行为，如果重复触发就计时归零后再次计时，直到用户静默到设定的阈值才再次执行。
 * 简而言之就是触发后N秒内不许触发，直到N秒后才可以执行。
 * <el-button type="primary" icon="search" plain v-debounce:500="handleSearch">搜索</el-button>
 */

const debounce = {
  // 检查绑定的值是否为函数
  mounted(el, binding) {
    if (typeof binding.value !== 'function') {
      throw new Error('Callback must be a function');
    }
    let timer = null;
    // 获取延迟时间，默认为 500 毫秒
    const delay = parseInt(binding.arg) || 500;
    // 获取按钮点击时执行的回调函数
    const handler = binding.value;

    // 监听按钮点击事件
    el.addEventListener(
      'click',
      () => {
        // 每次点击先清除之前的定时器
        clearTimeout(timer);
        // 创建一个新的定时器，在延迟时间后执行回调函数
        timer = setTimeout(() => {
          handler();
        }, delay);
      },
      // 阻止默认行为
      { passive: false }
    );
  }
};

export default debounce;
