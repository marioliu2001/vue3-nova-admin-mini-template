/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}' // 这里记得加上vue，官网直接拷贝过来是没有的
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
