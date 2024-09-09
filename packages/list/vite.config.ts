import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // 增加插件的使用
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'QXList',
      fileName: 'qx-list',
    },
    minify: false,
    rollupOptions: {
      external: [
        // 除了 @qx 开头的依赖项一起处理掉
        /@qx.*/,
        'vue',
      ],
    },
  },
});
