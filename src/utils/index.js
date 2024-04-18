/**
 * @description 使用递归过滤出需要渲染在左侧菜单静态的列表 (isHide == 0 是隐藏的菜单)
 * @param {Array} menuList 菜单列表
 * @returns {Array} 过滤后的菜单列表
 * */
export function getShowStaticMenuList(menuList) {
  let newMenuList = JSON.parse(JSON.stringify(menuList));
  return newMenuList.filter((item) => {
    return item.isHide === '1' || item.meta?.isHide === '1';
  });
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia 中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param {Object} result 处理后的结果
 * @returns {Object} 存储了所有面包屑的结果对象
 */
export const getAllBreadcrumbList = (menuList, parent = [], result = {}) => {
  for (const item of menuList) {
    // 将当前菜单路径及其所有父级菜单存储到结果对象中
    result[item.path] = [...parent, item];
    // 如果当前菜单有子菜单，则递归调用该函数处理子菜单
    if (item.children) getAllBreadcrumbList(item.children, result[item.path], result);
  }
  return result;
};

const mode = import.meta.env.VITE_ROUTER_MODE;
/**
 * @description 获取不同路由模式所对应的 url + params
 * @returns {String} 返回当前路由模式对应的完整 URL（包含参数）
 */
export function getUrlWithParams() {
  const url = {
    // 如果路由模式为 hash 模式，则返回 URL 中的 hash 部分（不包含 # 符号）
    hash: location.hash.substring(1),
    // 如果路由模式为 history 模式，则返回 URL 中的 pathname（路径部分）和 search（查询参数部分）拼接而成的完整 URL
    history: location.pathname + location.search
  };
  return url[mode];
}

/**
 * @description 获取浏览器默认语言
 * @returns {String} 返回浏览器默认语言
 */
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
  let defaultBrowserLang = '';
  if (['cn', 'zh', 'zh-cn'].includes(browserLang.toLowerCase())) {
    defaultBrowserLang = 'zh';
  } else {
    defaultBrowserLang = 'en';
  }
  return defaultBrowserLang;
}

/**
 * @description 获取assets静态资源
 * @param url 资源路径
 * @returns string 返回资源路径
 */
export const getAssets = (url) => {
  return new URL(`../assets/${url}`, import.meta.url).href;
};
