const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // https://github.com/francoismassart/eslint-plugin-tailwindcss
    'plugin:tailwindcss/recommended',

    //https://github.com/prettier/eslint-plugin-prettier
    // 把 Prettier 推荐的格式问题的配置以 ESLint rules 的方式写入，这样做可以统一代码问题的来源，报错的来源依旧是 ESLint 。
    'plugin:prettier/recommended',

    // https://github.com/prettier/eslint-config-prettier
    // 关闭所有不必要或可能与 Prettier 相冲突的规则
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    tailwindcss: {
      config: path.join(__dirname, 'tailwind.config.cjs'),
      whitelist: ['text-primary'],
    },
  },
};
