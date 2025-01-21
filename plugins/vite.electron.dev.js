//开发环境插件
import { spawn } from 'child_process'
import fs from 'node:fs'
//
//⚡ 全局存储electron进程的引用
let ElectronProcess = null

//打包编译background配置文件，输出到dist/background.js
const buildBackground = () => {
  require('esbuild').buildSync({
    entryPoints: ['src/electron/background.js'],
    bundle: true,
    outfile: 'dist/background.js',
    platform: 'node',
    target: 'node12',
    external: ['electron'],
  })
}
//⚡ 创建新的electron进程
const createElectronProcess = (ip) => {
  // 创建子进程用于启动electron，同时获取前端项目启动的端口号http://localhost:5174，并把它作为参数中传入，后续可以在background.js中使用process.argv[2]获取项目启动的端口号，以正确的加载资源
  const process = spawn(require('electron'), ['dist/background.js', ip])

  process.stderr.on('data', (data) => {
    console.log('electron日志:', data.toString())
  })

  process.on('error', (err) => {
    console.error('electron进程错误:', err)
  })

  return process
}

//⚡ 安全地关闭electron进程
const safeKillProcess = () => {
  return new Promise((resolve) => {
    if (!ElectronProcess) {
      resolve()
      return
    }

    ElectronProcess.once('exit', () => {
      ElectronProcess = null
      resolve()
    })

    try {
      ElectronProcess.kill('SIGTERM')
    } catch (err) {
      console.error('关闭进程失败:', err)
      ElectronProcess = null
      resolve()
    }
  })
}

export const electronDevPlugin = () => {
  return {
    name: 'electron-dev',
    configureServer(server) {
      buildBackground()

      server?.httpServer?.once('listening', () => {
        const addressInfo = server.httpServer?.address()
        const IP = `http://localhost:${addressInfo.port}`

        //⚡ 首次启动electron
        ElectronProcess = createElectronProcess(IP)

        //⚡ 监听background.ts文件变化
        fs.watchFile(
          process.cwd() + '/src/electron/background.ts',
          async () => {
            console.log('检测到background.ts变化，重启electron...')
            buildBackground()
            //⚡ 等待旧进程完全关闭后再创建新进程
            await safeKillProcess()
            ElectronProcess = createElectronProcess(IP)

            //监听当前electron进程的日志
            ElectronProcess.stderr.on('data', (data) => {
              console.log('❗ 日志', data.toString())
            })
            // 监听当前 Electron 进程的标准输出
            ElectronProcess.stdout.on('data', (data) => {
              console.log('🈯 输出', data.toString())
            })
          }
        )

        //⚡ 确保开发服务器关闭时清理资源
        const cleanup = async () => {
          await safeKillProcess()
          fs.unwatchFile(process.cwd() + '/src/electron/background.js')
        }

        process.on('exit', cleanup)
        process.on('SIGINT', cleanup)
        process.on('SIGTERM', cleanup)
      })
    },
  }
}
