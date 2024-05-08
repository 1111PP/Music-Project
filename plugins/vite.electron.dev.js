//开发环境插件
import { spawn } from 'child_process'
import fs from 'node:fs'
//启动vue项目的同时，顺便把electron的项目也启动，这样就不需要用到两个端口分别启动vue和electron了
export const electronDevPlugin = () => {
  return {
    name: 'electron-dev',
    //vite钩子，开发阶段启动vue项目时触发
    configureServer(server) {
      //监听vite启动vue项目
      server?.httpServer?.once('listening', () => {
        //读取到vite启动vue项目时开启的端口addressInfo：5174
        const addressInfo = server.httpServer?.address()
        console.log(addressInfo.port) //打印5174
        //拼接当前启动vue项目的ip地址，用它来启动electron服务
        const IP = `http://localhost:${addressInfo.port}`
        console.log(IP)
        //✨进程传参法，将IP发送给background，让electron能够根据vue项目的位置启动一个electron窗口
        //第一个参数时electron的入口文件,require('electron')会找到electron包中的命令
        //第二个参数electron配置文件位置
        //第三个参数是IP
        //🟥electron启动：开启一个进程展示项目,返回这个进程的信息ElectronProcess
        let ElectronProcess = spawn(require('electron'), [
          'src/background.js',
          IP,
        ])
        //👇配置：electron的热模块替换（🟥没有不是ts项目就不需要）
        //(因此此项目是js作为electron配置文件，vite项目自带hot热更新，electron会监听到vue项目的变化，它也会随之更新)
        //❌但是每次编译都会启动一个进程开启electron程序，所以在每次文件变化时必须干掉上一次electron开启的进程
        // 监听文件变化
        fs.watchFile('src/background.js', () => {
          //   关闭上一个进程
          ElectronProcess.kill()
          //每次热模块替换时都会杀死上一个，开启一个新的
          ElectronProcess = spawn(require('electron'), [
            'src/background.js',
            IP,
          ])
          //监听当前electron进程的日志
          ElectronProcess.stderr.on('data', (data) => {
            console.log('日志', data.toString())
          })
        })
      })
    },
  }
}
