module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 要求 require() 出现在顶层模块作用域中
    // 'global-require': 0,
    //  是否禁止使用特定的语法
    'no-restricted-syntax': 0,
    // 打开大括号之后和关闭大括号之前执行的换行规则
    'object-curly-newline': ['error', { consistent: true }],
  },
};
