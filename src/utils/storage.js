/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const Local = {
  /**
   * 设置永久缓存
   * @param {string} key 缓存键
   * @param {any} val 缓存值
   * @returns {boolean} 操作是否成功
   */
  set(key, val) {
    try {
      window.localStorage.setItem(key, JSON.stringify(val));
      return true;
    } catch (e) {
      console.error('Failed to set in localStorage', e);
      return false;
    }
  },

  /**
   * 获取永久缓存
   * @param {string} key 缓存键
   * @returns {any} 缓存值
   */
  get(key) {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Failed to get from localStorage', e);
      return null;
    }
  },

  /**
   * 移除永久缓存
   * @param {string} key 缓存键
   * @returns {boolean} 操作是否成功
   */
  remove(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Failed to remove from localStorage', e);
      return false;
    }
  },

  /**
   * 移除全部永久缓存
   * @returns {boolean} 操作是否成功
   */
  clear() {
    try {
      window.localStorage.clear();
      return true;
    } catch (e) {
      console.error('Failed to clear localStorage', e);
      return false;
    }
  }
};

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
  /**
   * 设置临时缓存
   * @param {string} key 缓存键
   * @param {any} val 缓存值
   * @returns {boolean} 操作是否成功
   */
  set(key, val) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(val));
      return true;
    } catch (e) {
      console.error('Failed to set in sessionStorage', e);
      return false;
    }
  },

  /**
   * 获取临时缓存
   * @param {string} key 缓存键
   * @returns {any} 缓存值
   */
  get(key) {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Failed to get from sessionStorage', e);
      return null;
    }
  },

  /**
   * 移除临时缓存
   * @param {string} key 缓存键
   * @returns {boolean} 操作是否成功
   */
  remove(key) {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Failed to remove from sessionStorage', e);
      return false;
    }
  },

  /**
   * 移除全部临时缓存
   * @returns {boolean} 操作是否成功
   */
  clear() {
    try {
      window.sessionStorage.clear();
      return true;
    } catch (e) {
      console.error('Failed to clear sessionStorage', e);
      return false;
    }
  }
};
