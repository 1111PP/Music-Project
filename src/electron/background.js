const { app, dialog, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')
// 主窗口
let mainWindow = null
// 单实例
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  // 如果无法获得锁，说明已经有实例在运行，退出当前实例
  app.quit()
} else {
  // 监听第二个实例的启动
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 如果存在窗口，则激活并聚焦到该窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore()
      }
      mainWindow.focus()
    }
  })
  app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
      // 开发换件下自动打开开发者工具
      minWidth: process.argv[2] ? 1153 + 350 : 1153,
      minHeight: 780,
      width: 2000,
      height: 1080,
      x: 1800,
      y: 100,
      frame: false, // 去除标题栏
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        contextIsolation: false,
        // enableRemoteModule: true,
        //❌无法使用preload文件
        // preload: path.join(__dirname, 'preload.js'),
      },
    })
    console.log('🟥process.argv[2]', process.argv[2])
    //开发环境下 打开开发者工具
    if (process.argv[2]) {
      mainWindow.webContents.openDevTools()
    }

    //进程传参法
    // ✨process.argv[2]
    //读取vite.electron.dev.js文件中数组下标为2的第三个参数：IP
    //如果能读到process.argv[2]说明是开发环境
    if (process.argv[2]) {
      // loadURL加载指定网址，就是将vue项目运行的网址（✨如：http://localhost:5174）传入，开启一个electron的窗口从而映射这个项目
      mainWindow.loadURL(process.argv[2])
      // mainWindow.loadURL('http://localhost:5174')
    } else {
      //如果是生产环境，直接loadFile读取打包后dist文件夹下的index.html文件
      mainWindow.loadFile('index.html')
    }

    // 下载音乐
    ipcMain.on('download-music', (event, { fileName }) => {
      // 解码文件名
      const decodedFileName = decodeURIComponent(fileName)

      //此处 dirname 为dist目录
      let absoluteFilePath = path.join(
        __dirname,
        '/musicMp3/' + decodedFileName
      )
      console.log('读取路径：', absoluteFilePath)

      //让用户自由选择保存路径
      let savePath = dialog.showSaveDialogSync({
        title: '保存文件',
        defaultPath: path.join(app.getPath('downloads'), decodedFileName),
        buttonLabel: '保存',
        filters: [{ name: 'Music', extensions: ['mp3'] }],
      })
      console.log('保存路径：', savePath)
      if (!savePath) {
        event.reply('download-status', { status: 'fail', msg: '用户取消下载' })
        return
      }
      fs.readFile(absoluteFilePath, (err, data) => {
        if (err) {
          console.error('读取文件失败:', err)
          event.reply('download-status', {
            status: 'fail',
            msg: '读取文件失败',
          })
          return
        }
        fs.writeFile(savePath, data, (writeErr) => {
          if (writeErr) {
            console.error('文件保存失败:', writeErr)
            event.reply('download-status', { status: 'fail', msg: writeErr })
          } else {
            console.log('文件保存成功:', savePath)
            event.reply('download-status', {
              status: 'success',
              savePath: savePath,
              msg: '文件保存成功',
            })
          }
        })
      })
    })

    //关闭主窗口
    ipcMain.on('close-mainWindow', () => {
      if (!mainWindow) return
      mainWindow.close()
      mainWindow = null
    })

    //最小化主窗口
    ipcMain.on('minimize-mian-mainWindow', () => {
      mainWindow.minimize()
    })

    // 打开dialog
    ipcMain.on('open-dialog', () => {
      dialog
        .showMessageBox({
          title: '消息提醒',
          defaultId: 0,
          message: `消息弹窗测试`,
          buttons: ['确定', '取消'],
        })
        .then((result) => {
          //输出 { response: 1, checkboxChecked: false }
          console.log(result)
          let index = result.response
          if (index === 0) {
            // 确定按钮
          }
        })
    })

    let lyricDialog
    // 打开dialog
    ipcMain.on('open-lyric-dialog', () => {
      if (lyricDialog) {
        //如果之前存在此窗口，则关闭重新开启
        lyricDialog.close()
        lyricDialog = null
        return
      } else {
        // 获取主窗口的位置和尺寸
        const mainWindowBounds = mainWindow.getBounds()

        // 设置子窗口的位置，放置在主窗口下方
        const dialogX =
          mainWindowBounds.x + Math.floor(mainWindowBounds.width / 2)
        const dialogY = mainWindowBounds.y + mainWindowBounds.height

        lyricDialog = new BrowserWindow({
          width: 500,
          height: 500,
          x: dialogX, // 设置子窗口的x坐标
          y: dialogY, // 设置子窗口的y坐标为主窗口的下方
          frame: false, // 去除标题栏
          transparent: true, // 使窗口背景透明
          alwaysOnTop: true, // 窗口置顶
          skipTaskbar: true, // 不显示任务栏图标
          resizable: false, // 禁止调整窗口大小
          webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: false,
          },
        })
        // lyricDialog.webContents.openDevTools()
        // 不额外显示任务栏图标
        lyricDialog.setSkipTaskbar(true)
        // 加载打包后的歌词窗口内容
        lyricDialog.loadURL(`${process.argv[2]}/#/lyrics-dialog`) // 访问歌词路由

        // 子窗口初始化完毕后向主窗口传递消息
        lyricDialog.once('ready-to-show', (evnet, func) => {
          // console.log('子窗口准备完毕')
          mainWindow.webContents.send('child-ready-to-show')
        })
      }
    })
    // 监听主窗口发送的歌曲信息更新消息
    ipcMain.on('update-song-info', (event, { currSongTextInfo }) => {
      if (lyricDialog) {
        // console.log('change Song', currSongTextInfo)
        lyricDialog.webContents.send('song-info-updated', currSongTextInfo)
      }
    })
    // 歌词变化发送给子窗口
    ipcMain.on('update-song-word', (event, { lyricData }) => {
      if (lyricDialog) {
        // console.log(lyricData)
        // 如果子窗口存在，则向子窗口发送歌曲信息更新消息
        lyricDialog.webContents.send('song-word-updated', lyricData)
      }
    })
    ipcMain.on('close-lyric-dialog', () => {
      if (lyricDialog) {
        lyricDialog.close()
        lyricDialog = null
      }
    })

    // 子 ——> 主 修改歌曲
    ipcMain.on('lyric-change-song', (event, flag) => {
      mainWindow.webContents.send('lyric-change-song', flag)
    })
    // 子 ——> 主 修改开关
    ipcMain.on('lyric-handle-switch', () => {
      mainWindow.webContents.send('lyric-handle-switch')
    })
    // 主 ——> 子  修改开关
    ipcMain.on('lyric-switch-state', (event, state) => {
      //为什么延迟发送开关状态❓
      //   子窗口的初始化可能没有创建及时，（虽然主窗口收到子窗口准备完毕事件ready-to-show，再触发lyric-switch-state修改子窗口开关状态），但还是无法初始化，所以延迟设置
      lyricDialog &&
        setTimeout(
          () => lyricDialog.webContents.send('lyric-switch-state', state),
          100
        )
    })
  })
}
