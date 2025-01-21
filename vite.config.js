import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 以下三项为配置Element-plus按需自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { loadEnv } from 'vite'

//引入自定义的插件
//1.开发时启动electron插件
import { electronDevPlugin } from './plugins/vite.electron.dev'
//2.electron打包插件
import { ElectronBuildPlugin } from './plugins/vite.electron.build.js'
import esbuild from 'rollup-plugin-esbuild'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log('🟥env', env.VITE_JAVA_SERVER_BASE_API)
  return {
    plugins: [
      // 以下两项为配置Element-plus按需自动引入
      AutoImport({
        resolvers: [
          // element-plus主题色配置相关--下面这句importStyle一定要写，否则就会不生效
          ElementPlusResolver({
            // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
            importStyle: 'sass',
          }),
        ],
      }),
      Components({
        resolvers: [
          // element-plus主题色配置相关--下面这句importStyle一定要写，不要写个空对象在这儿，否则就会不生效
          ElementPlusResolver({
            // 自动引入修改主题色添加这一行，使用预处理样式
            importStyle: 'sass',
          }),
        ],
      }),
      //electron自动化开发测试和打包插件
      electronDevPlugin(),
      ElectronBuildPlugin(),
      //可选链配置
      {
        ...esbuild({
          target: 'chrome70',
          include: /\.vue|.ts|.js$/,
          loaders: {
            '.vue': 'js',
          },
        }),
        enforce: 'post',
      },
      vue(),
    ],
    //🟥默认是绝对路径，要改为相对路径,不然会白屏
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@public': path.resolve(__dirname, './public'),
      },
    },
    server: {
      proxy: {
        '/node-api': {
          // target: 'http://47.236.176.127:1200',
          target: 'http://localhost:1200',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/node-api/, ''),
        },
        '/java': {
          target: 'http://localhost:8081',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/java/, ''),
        },
        //随机获取小猫图片
        '/dog': {
          target: 'https://dog.ceo/api/breeds/image/random',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/cat/, ''),
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
  }
})
