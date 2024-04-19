// 导入二次封装axios方法
import { post } from '@/utils/axios.js';

// 统一管理接口
const API = {
  NOVA_LOGIN: '/auth/login',
  NOVA_USERINFO: '/koi/sysLoginUser/getLoginUserInfo'
};

// 登录接口方法
export const novaLogin = (data) => {
  return post(API.NOVA_LOGIN, data);
};
