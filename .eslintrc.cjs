module.exports = {
  // 指定此配置文件为根配置文件，ESLint 将停止在父目录中查找配置。
  root: true,
  // 指定环境，这里设置为 Node.js 环境
  env: {
    node: true
  },
  // 指定解析器，这里使用 vue-eslint-parser 解析 Vue 文件
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2018, // 指定要使用的 ECMAScript 版本 'latest' 这是最新
    sourceType: 'module', // 设置为 "module" 表示 ECMAScript 模块
    jsxPragma: 'React', // 指定在 JSX 文件中使用的 pragma，默认为 "React"
    ecmaFeatures: {
      jsx: true // 启用 JSX 支持
    }
  },
  // 扩展规则，这里使用了一些推荐的规则集和插件
  extends: [
    'plugin:vue/vue3-recommended', // Vue.js 推荐规则
    'plugin:prettier/recommended', // Prettier 推荐规则
    'eslint-config-prettier' // 禁用与 Prettier 冲突的 ESLint 规则
  ],
  // 自定义规则
  rules: {
    // 在这里添加或修改规则
    'space-before-function-paren': 'off', // 关闭函数参数前的空格规则
    'no-use-before-define': 'off', // 禁止定义之前使用变量
    'no-unused-vars': [
      // 禁止未使用的变量
      'error',
      {
        argsIgnorePattern: '^_', // 忽略以下划线开头的参数
        varsIgnorePattern: '^_' // 忽略以下划线开头的变量
      }
    ],
    'vue/comment-directive': 'off', // 关闭注释指令
    'vue/script-setup-uses-vars': 'error', // Vue3 `<script setup>` 必须使用的变量
    'vue/multi-word-component-names': 'off', // 关闭多个单词组件名
    'vue/custom-event-name-casing': 'off', // 关闭自定义事件名称大小写
    'vue/attributes-order': 'off', // 关闭属性排序
    'vue/one-component-per-file': 'off', // 关闭每个文件只有一个组件
    'vue/html-closing-bracket-newline': 'off', // 关闭 HTML 标签闭合括号的换行
    'vue/max-attributes-per-line': 'off', // 关闭每行最大属性数
    'vue/multiline-html-element-content-newline': 'off', // 关闭多行 HTML 元素内容的换行
    'vue/singleline-html-element-content-newline': 'off', // 关闭单行 HTML 元素内容的换行
    'vue/attribute-hyphenation': 'off', // 关闭属性连字符命名
    'vue/require-default-prop': 'off', // 关闭要求默认的属性
    'vue/html-self-closing': [
      // 要求或禁止自我关闭的标签
      'error',
      {
        html: {
          void: 'always', // 要求对 HTML 中的空元素进行自我关闭
          normal: 'never', // 不要求对普通元素进行自我关闭
          component: 'always' // 要求对组件进行自我关闭
        },
        svg: 'always', // 要求对 SVG 元素进行自我关闭
        math: 'always' // 要求对 MathML 元素进行自我关闭
      }
    ]
  }
};
