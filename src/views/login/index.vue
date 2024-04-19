<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { novaMsgSuccess } from '@/utils/nova.js';
import authLogin from '@/assets/json/authLogin.json';
import useUserStore from '@/stores/modules/user.js';
import useKeepAliveStore from '@/stores/modules/keepAlive.js';
import { HOME_URL } from '@/config/index.js';

const userStore = useUserStore();
const keepAliveStore = useKeepAliveStore();
const router = useRouter();

// 登录代码
const loginFormRef = ref();
const loading = ref(false);

const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: ''
});

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

const handleLogin = async (loginFormRef) => {
  if (!loginFormRef) return;
  await loginFormRef.validate((valid, fields) => {
    if (valid) {
      // 在这里添加登录逻辑
      loading.value = true;
      // 1、执行登录接口
      // 2、将返回的token值存储到store中
      userStore.setToken(authLogin.data.tokenValue);
      // 3、添加动态路由 AND 用户按钮 AND 角色信息 AND 用户个人信息
      // await initDynamicRouter();

      // 4、清空 tabs数据、keepAlive缓存数据
      // tabsStore.setTab([]);
      keepAliveStore.setKeepAliveName([]);

      // 5、跳转到首页
      loading.value = false;
      novaMsgSuccess('登录成功🌻');
      router.push(HOME_URL);
      console.log('Login successful!');
    } else {
      console.log('error submit!', fields);
    }
  });
};
</script>

<template>
  <div
    class="container flex justify-center items-center h-screen bg-blue-400 bg-gradient-to-r from-blue-400 to-blue-600"
  >
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">系统登录</h2>
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="0" class="mt-4">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="Username" size="large" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="Password"
            show-password
            size="large"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            v-if="!loading"
            @click="handleLogin(loginFormRef)"
            class="w-full"
            size="large"
            >登录</el-button
          >
          <el-button
            type="primary"
            class="w-full"
            size="large"
            disabled
            v-if="loading"
            :loading="loading"
            >登录中...</el-button
          >
        </el-form-item>
        <el-form-item>
          <div class="flex justify-between items-center w-full">
            <div class="flex items-center">
              <el-checkbox v-model="loginForm.rememberMe">Remember me</el-checkbox>
            </div>
            <div>
              <a href="#" class="text-blue-500 hover:text-blue-700">忘记密码?</a>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped></style>
