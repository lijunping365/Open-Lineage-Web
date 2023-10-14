import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 获取 .env 环境配置文件
  const { VITE_PUBLIC_PATH } = loadEnv(mode, process.cwd());

  return {
    base: VITE_PUBLIC_PATH,
    plugins: [react(), eslint()],
  };
});
