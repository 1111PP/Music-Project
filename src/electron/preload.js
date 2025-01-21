const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  downloadMusic: (fileName) => ipcRenderer.send('download-music', { fileName }),
  // 添加其他 API
})
