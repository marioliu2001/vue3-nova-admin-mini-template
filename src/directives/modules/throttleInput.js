/*
  节流就是N秒内只执行一次，不管在N秒内重复调用了多少次，也只执行一次。
  <input v-throttleInput="throttleClick">节流提交</input>
*/

// 定义节流指令
const throttleInput = {
  // 指令挂载时执行
  mounted(el, binding) {
    // 获取指令参数，即节流延迟时间，默认为 500ms
    const delay = parseInt(binding.arg) || 500;
    // 获取指令绑定的事件处理函数
    const handler = binding.value;
    // 记录上次触发事件的时间戳
    let lastExecTime = 0;

    // 监听输入框的 input 事件
    el.addEventListener(
      'input',
      () => {
        // 获取当前时间戳
        const now = Date.now();
        // 如果距离上次触发事件的时间间隔大于设定的延迟时间，则执行事件处理函数
        if (now - lastExecTime > delay) {
          // 执行事件处理函数
          handler();
          // 更新上次触发事件的时间戳
          lastExecTime = now;
        }
      },
      // 需要禁用被动事件监听器来使用 preventDefault() 等方法
      { passive: false }
    );
  }
};

export default throttleInput;
