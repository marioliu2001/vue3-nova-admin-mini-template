/*
  需求：防止按钮在短时间内被多次点击，使用节流函数限制规定时间内只能点击一次。
  节流就是N秒内只执行一次，不管在N秒内重复调用了多少次，也只执行一次。
  思路：
    1、第一次点击，立即调用方法并禁用按钮，等延迟结束再次激活按钮
    2、将需要触发的方法绑定在指令上

  使用：给 Dom 加上 v-throttle 及回调函数即可
  <el-button type="danger" icon="refresh" plain v-throttle="resetSearch">重置</el-button>
*/
// 定义节流指令
const throttle = {
  mounted(el, binding) {
    // 获取延迟时间，默认为 500 毫秒
    const delay = parseInt(binding.arg) || 500;
    // 获取需要触发的回调函数
    const handler = binding.value;
    // 记录上次执行回调函数的时间
    let lastExecTime = 0;

    // 监听按钮点击事件
    el.addEventListener(
      'click',
      () => {
        // 获取当前时间
        const now = Date.now();
        // 判断距离上次执行回调函数的时间是否超过延迟时间
        if (now - lastExecTime > delay) {
          // 如果超过延迟时间，则执行回调函数
          handler();
          // 更新上次执行回调函数的时间
          lastExecTime = now;
        }
      },
      { passive: false }
    );
  }
};

export default throttle;
