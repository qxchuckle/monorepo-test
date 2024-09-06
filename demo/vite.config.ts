// demo/vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { join } from "node:path";
import { fileURLToPath, URL } from "node:url";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    ElementPlus({}),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router"],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^@qx\/(.+)$/,
        replacement: join(__dirname, "..", "packages", "$1", "src"),
      },
    ],
  },
});
