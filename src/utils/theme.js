import { novaMsgWarning, novaMsgSuccess } from '@/utils/nova.js';
import { storeToRefs } from 'pinia';
import { DEFAULT_THEME } from '@/config/index.js';
import useGlobalStore from '@/stores/modules/global.js';
import { menuTheme, headerTheme, asideTheme } from '@/config/theme.js';

/** 主题切换方式[推荐] */
/**
 * 将十六进制颜色值转换为 RGB 颜色值
 * @param {String} str - 十六进制颜色值字符串，可以带 # 号，也可以不带
 * @returns {Array} - 返回包含 RGB 颜色值的数组，数组格式为 [R, G, B]
 */
export function hexToRgb(str) {
  // 定义正则表达式来匹配合法的十六进制颜色值
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(str)) {
    novaMsgWarning('输入错误的hex');
    return [];
  }
  // 去除可能存在的 # 号，并将颜色值转换为大写形式
  str = str.replace('#', '');
  // 将颜色值拆分成 R、G、B 三部分
  const hexs = str.match(/../g);
  // 将十六进制的 R、G、B 分量转换为十进制
  const rgb = hexs.map((hex) => parseInt(hex, 16));
  return rgb;
}

/**
 * 将 RGB 颜色值转换为十六进制颜色值
 * @param {number} r - 红色分量，取值范围为 0 到 255
 * @param {number} g - 绿色分量，取值范围为 0 到 255
 * @param {number} b - 蓝色分量，取值范围为 0 到 255
 * @returns {String} - 返回处理后的十六进制颜色值，形如 "#RRGGBB"
 */
export function rgbToHex(r, g, b) {
  let reg = /^\d{1,3}$/;
  if (!reg.test(r) || !reg.test(g) || !reg.test(b)) {
    novaMsgWarning('输入错误的rgb颜色值');
    return '';
  }
  // 将 RGB 分量转换为对应的十六进制字符串，并在必要时补齐成两位
  const hexs = [r, g, b].map((component) => {
    const hex = component.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  });
  // 拼接成完整的十六进制颜色值，并返回
  return `#${hexs.join('')}`;
}

/**
 * @description 将给定颜色值加深一定程度
 * @param {String} color 输入的颜色值，可以是十六进制形式，如 "#RRGGBB"，也可以是RGB形式，如 "rgb(255, 0, 0)"
 * @param {Number} level 加深的程度，限0-1之间
 * @returns {String} 返回处理后的颜色值，以十六进制形式表示，如 "#RRGGBB"
 */
export function getDarkColor(color, level) {
  // 正则表达式用于验证输入的颜色值是否合法
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  // 检查输入的颜色值是否合法
  if (!reg.test(color)) {
    novaMsgWarning('输入错误的hex颜色值');
    return '';
  }
  // 将十六进制颜色值转换为 RGB 分量
  const rgb = hexToRgb(color);
  // 对每个 RGB 分量进行加深处理
  for (let i = 0; i < 3; i++) {
    // 计算加深后的分量值
    rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level));
  }
  // 将加深后的 RGB 分量转换为十六进制颜色值，并返回
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

/**
 * @description 将给定颜色值变浅一定程度
 * @param {String} color 输入的颜色值，可以是十六进制形式，如 "#RRGGBB"，也可以是RGB形式，如 "rgb(255, 0, 0)"
 * @param {Number} level 加深的程度，限0-1之间
 * @returns {String} 返回处理后的颜色值，以十六进制形式表示，如 "#RRGGBB"
 */
export function getLightColor(color, level) {
  // 正则表达式用于验证输入的颜色值是否合法
  let reg = /^\#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(color)) {
    novaMsgWarning('输入错误的hex颜色值');
    return '';
  }
  // 将十六进制颜色值转换为 RGB 分量
  const rgb = hexToRgb(color);
  // 对每个 RGB 分量进行变浅处理
  for (let i = 0; i < 3; i++) {
    // 计算变浅后的分量值
    rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));
  }
  // 将变浅后的 RGB 分量转换为十六进制颜色值，并返回
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}

/**
 * @description 全局主题配置
 * 用于管理全局的主题设置，包括暗黑模式、主题颜色、灰色模式、弱色模式等。
 * */
export const useTheme = () => {
  const globalStore = useGlobalStore();
  const { layout, isDark, themeColor, isGrey, isWeak, asideInverted, headerInverted } =
    storeToRefs(globalStore);

  // 切换暗黑模式 ==> 同时修改主题颜色、侧边栏、头部颜色
  const switchDark = () => {
    // 获取HTML根节点
    const html = document.documentElement;
    if (isDark.value) html.setAttribute('class', 'dark');
    else html.setAttribute('class', '');
    changeThemeColor(themeColor.value);
    setAsideTheme();
    setHeaderTheme();
  };

  // 修改主题颜色
  const changeThemeColor = (val) => {
    if (!val) {
      val = DEFAULT_THEME;
      novaMsgSuccess('主题颜色已重置为默认主题🌈');
    }
    // 计算主题颜色变化
    document.documentElement.style.setProperty('--el-color-primary', val);
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      isDark.value ? `${getLightColor(val, 0.2)}` : `${getDarkColor(val, 0.3)}`
    );
    for (let i = 1; i <= 9; i++) {
      const primaryColor = isDark.value
        ? `${getDarkColor(val, i / 10)}`
        : `${getLightColor(val, i / 10)}`;
      document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, primaryColor);
    }
    globalStore.setGlobalState('themeColor', val);
  };

  // 灰色和弱色切换
  const changeGreyOrWeak = (type, value) => {
    const body = document.body;
    if (!value) return body.removeAttribute('style');
    const styles = {
      grey: 'filter: grayscale(1)',
      weak: 'filter: invert(80%)'
    };
    body.setAttribute('style', styles[type]);
    const propName = type === 'grey' ? 'isWeak' : 'isGrey';
    globalStore.setGlobalState(propName, false);
  };

  // 设置菜单样式
  const setMenuTheme = () => {
    let type = 'light';
    // 如果布局为横向 && 头部反转
    if (layout.value === 'horizontal' && headerInverted.value) type = 'inverted';
    // 如果布局不为横向 && 侧边反转
    if (layout.value !== 'horizontal' && asideInverted.value) type = 'inverted';
    // 如果是黑色主题，直接为黑色
    if (isDark.value) type = 'dark';
    const theme = menuTheme[type];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
  };

  // 设置侧边栏样式
  const setAsideTheme = () => {
    let type = 'light';
    if (asideInverted.value) type = 'inverted';
    if (isDark.value) type = 'dark';
    const theme = asideTheme[type];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
    setMenuTheme();
  };

  // 设置头部样式
  const setHeaderTheme = () => {
    let type = 'light';
    if (headerInverted.value) type = 'inverted';
    if (isDark.value) type = 'dark';
    const theme = headerTheme[type];
    for (const [key, value] of Object.entries(theme)) {
      document.documentElement.style.setProperty(key, value);
    }
    setMenuTheme();
  };

  // 初始化主题配置
  const initThemeConfig = () => {
    switchDark();
    if (isGrey.value) changeGreyOrWeak('grey', true);
    if (isWeak.value) changeGreyOrWeak('weak', true);
  };

  return {
    initThemeConfig,
    switchDark,
    changeThemeColor,
    changeGreyOrWeak,
    setAsideTheme,
    setHeaderTheme
  };
};
