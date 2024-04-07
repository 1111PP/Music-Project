import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 以下三项为配置Element-plus按需自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { VantResolver } from '@vant/auto-import-resolver'

export default defineConfig({
  plugins: [
    // 以下两项为配置Element-plus按需自动引入
    AutoImport({
      resolvers: [
        // element-plus主题色配置相关--下面这句importStyle一定要写，不要写个空对象在这儿，否则就会不生效
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
          importStyle: 'sass',
        }),
        VantResolver(),
      ],
    }),
    Components({
      resolvers: [
        // element-plus主题色配置相关--下面这句importStyle一定要写，不要写个空对象在这儿，否则就会不生效
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式
          importStyle: 'sass',
        }),
        VantResolver(),
      ],
    }),
    ,
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:1200/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `
        @use "./src/styles/index.scss" as *;
        `,
      },
    },
  },
})
