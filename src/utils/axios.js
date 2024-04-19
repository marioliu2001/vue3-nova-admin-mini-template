import axios from 'axios';

import { novaMsgError } from '@/utils/nova.js';
import { LOGIN_URL } from '@/config/index.js';
import useUserStore from '@/stores/modules/user.js';
import { getToken } from '@/utils/storage.js';
import router from '@/routers/index.js';

// 创建axios实例
const instance = axios.create({
  // 接口请求的地址
  baseURL: import.meta.env.VITE_WEB_BASE_API,
  // 请求超时时间
  timeout: 10000
});

// 添加请求拦截器 ===> 前端给后端的参数 [还没到后端响应]
instance.interceptors.request.use(
  function (config) {
    // 获取token
    const token = getToken();
    if (token) {
      // 配置请求头
      config.headers = {
        // 'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
        ContentType: 'application/json;charset=UTF-8', // 传参方式json
        Authorization: `Bearer ${token}` // 这里自定义配置，这里传的是token
      };
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    error.data = {};
    error.data.msg = '服务器异常，请联系管理员🌻';
    return error;
  }
);

// 添加响应拦截器 ===> 后端给前端的参数 [后端返回给前端]
instance.interceptors.response.use(
  async function (response) {
    console.log('response', response);
    // 2xx 范围内的状态码都会触发该函数。
    const status = response.data.status || response.data.code; // 后端返回数据状态，这里跟后端约定好它的返回参数是啥
    if (status === 200) {
      // 服务器连接状态，非后端返回的status 或者 code
      // 这里的后端可能是code OR status 和 msg OR message需要看后端传递的是什么？
      // console.log("200状态", status);
      return response.data;
    } else if (status === 401) {
      // console.log("401状态", status);
      const userStore = useUserStore();
      userStore.setToken(''); // 清空token必须使用这个，不能使用session清空，因为登录的时候js会获取一遍token还会存在。
      novaMsgError('登录身份过期，请重新登录🐱');
      await router.replace(LOGIN_URL);
      return Promise.reject(response.data);
    } else {
      // console.log("后端返回数据：",res.data.msg)
      novaMsgError(response.data.msg + '🐱' || '服务器偷偷跑到火星去玩了🐱');
      return Promise.reject(response.data.msg + '🐱' || '服务器偷偷跑到火星去玩了🐱'); // 可以将异常信息延续到页面中处理，使用try{}catch(error){};
    }
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 处理网络错误，不是服务器响应的数据
    // console.log("进入错误",error);
    error.data = {};
    if (error && error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          error.data.msg = '请求错误🌻';
          novaMsgError(error.data.msg);
          break;
        case 401:
          // Token 过期时
          error.data.msg = '权限不足, 请重新登录🌻';
          novaMsgError(error.data.msg);
          // logout()
          break;
        case 403:
          error.data.msg = '对不起，您没有权限访问🌻';
          novaMsgError(error.data.msg);
          break;
        case 404:
          error.data.msg = '请求错误,未找到请求路径🌻';
          novaMsgError(error.data.msg);
          break;
        case 405:
          error.data.msg = '请求方法未允许🌻';
          novaMsgError(error.data.msg);
          break;
        case 408:
          error.data.msg = '请求超时🌻';
          novaMsgError(error.data.msg);
          break;
        case 500:
          error.data.msg = '服务器又偷懒了，请重试🌻';
          novaMsgError(error.data.msg);
          break;
        case 501:
          error.data.msg = '网络未实现🌻';
          novaMsgError(error.data.msg);
          break;
        case 502:
          error.data.msg = '网关错误🌻';
          novaMsgError(error.data.msg);
          break;
        case 503:
          error.data.msg = '服务不可用🌻';
          novaMsgError(error.data.msg);
          break;
        case 504:
          error.data.msg = '网关超时🌻';
          novaMsgError(error.data.msg);
          break;
        case 505:
          error.data.msg = 'HTTP 版本不支持该请求🌻';
          novaMsgError(error.data.msg);
          break;
        default:
          error.data.msg = `连接错误${error.response.status}`;
          novaMsgError(error.data.msg);
      }
    } else if (JSON.stringify(error).includes('timeout')) {
      // 超时处理
      error.data.msg = '服务器响应超时，请刷新当前页或重试请求🌻';
      novaMsgError(error.data.msg);
    } else {
      error.data.msg = '连接服务器失败🌻';
      novaMsgError(error.data.msg);
    }
    return Promise.reject(error); // 将错误返回给 try{} catch(){} 中进行捕获，就算不进行捕获，上方 res.data.status != 200也会抛出提示。
  }
);

// Get请求
export const get = (url, params) => {
  return instance.get(url, params);
};

// Post请求
export const post = (url, data) => {
  return instance.post(url, data);
};

// Put请求
export const put = (url, data) => {
  return instance.put(url, data);
};

// Delete请求
export const del = (url, data) => {
  return instance.delete(url, data);
};

// 最终返回的axios对象
export default instance;
