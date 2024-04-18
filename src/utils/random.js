/**
 * 获取随机整数
 * @param {number} n - 下限（包括）
 * @param {number} m - 上限（包括）
 * @return {number} 在 n 和 m 之间的随机整数
 */
export function randomInt(n, m) {
  if (n > m) {
    // 如果 n 大于 m，交换它们以确保正确的范围
    [n, m] = [m, n];
  }
  return Math.floor(Math.random() * (m - n + 1) + n);
}

/**
 * @description 生成uuid 生成全球唯一标识
 * @returns string 返回 uuid
 */
export function uuid() {
  return crypto.randomUUID();
}

/**
 * 根据当前时间段返回问候语
 * @returns {string} 根据时间段变化的问候语
 */
export const getDayText = () => {
  const timeNow = new Date(); // 获取当前时间
  const hours = timeNow.getHours(); // 获取当前小时数
  // 根据小时数返回不同的问候语
  if (hours >= 6 && hours < 10) return '清晨好🌅，愿你的一天充满希望和活力！';
  if (hours >= 10 && hours < 14) return '午安🍀，享受这个美好的午后时光吧。';
  if (hours >= 14 && hours < 18) return '午后好🌼，继续你的美好日程吧。';
  if (hours >= 18 && hours < 24) return '傍晚好🌆，今天你真棒！现在是放松的时候了。';
  if (hours >= 0 && hours < 6) return '深夜好🌜，记得要给自己足够的休息。';
  return '你好呀！'; // 默认问候语
};
