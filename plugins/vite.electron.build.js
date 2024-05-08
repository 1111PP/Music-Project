//生产环境插件
import fs from 'node:fs'
import * as electronBuilder from 'electron-builder'
import path from 'path'
//打包编译background配置文件，输出到dist/background.js
const buildBackground = () => {
  require('esbuild').buildSync({
    // entryPoints: ['src/background.ts'],//如果是ts项目
    entryPoints: ['src/background.js'],
    bundle: true,
    outfile: 'dist/background.js',
    platform: 'node',
    target: ['node12'],
    external: ['electron'],
  })
}
//打包需要先让vite对vue项目进行打包，随后再执行electron-builder（✨electron打包插件）进行打包
export const ElectronBuildPlugin = () => {
  return {
    name: 'electron-build',
    //vite打包vue项目结束后执行的钩子
    closeBundle() {
      //不管是ts还是js，最终都需要往dist中放入一个backrground.js文件
      //如果是ts项目的话需要优先打包一下再放入
      //如果是js，则直接往dist中塞入一个backrground.js
      buildBackground()
      //electron-builder打包插件需要指定package.json -> main
      const json = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
      json.main = 'background.js'
      //将修改后的package.json写入 -> 打包后的vue文件的dist目录下的package.json
      fs.writeFileSync('dist/package.json', JSON.stringify(json, null, 4))
      //❌electron-builder存在一个bug：会下载垃圾文件
      fs.mkdirSync('dist/node_modules') //🈯解决：创建一个假的node_modules文件放入打包文件内

      //🟥打包配置
      electronBuilder.build({
        config: {
          directories: {
            //打包文件输出与dist文件平级的release文件中
            output: path.resolve(process.cwd(), 'release'), //process.cwd()获取根目录
            //基于vue打包后生成的dist文件 -> 再进行electron打包工作
            app: path.resolve(process.cwd(), 'dist'),
          },
          //   files: ['**/*'],
          asar: true, //打包为压缩包
          appId: 'com.example.app', //打包后的包名
          productName: 'vite-electron',
          nsis: {
            oneClick: false, //取消双击安装包会一键安装的行为
            allowToChangeInstallationDirectory: true, //允许用户选择安装目录
          },
        },
      })
    },
  }
}
