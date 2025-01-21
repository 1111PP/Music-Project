export const defaultShortcutMap = {
  'Control+ArrowRight': 'nextSong',
  'Control+ArrowLeft': 'prevSong',
  'Control+ArrowUp': 'volumeUp',
  'Control+ArrowDown': 'volumeDown',
  Space: 'playOrPause',
}
export const shortcutLangMap = {
  nextSong: '下一首',
  prevSong: '上一首',
  volumeUp: '音量加',
  volumeDown: '音量减',
  playOrPause: '播放/暂停',
}
export const reigsterShortcut = (key, value) => {
  localStorage.setItem('shortcut', JSON.stringify(defaultShortcutMap))
}

export const getShortcut = () => {
  const shortCutMap = JSON.parse(localStorage.getItem('shortcut'))
  return shortCutMap
}

export const setShortcut = (actionName, key) => {
  const shortcutMap = getShortcut()
  const newData = Object.fromEntries(
    Object.entries(shortcutMap).filter(([key, value]) => value !== actionName)
  )
  newData[key] = actionName
  localStorage.setItem('shortcut', JSON.stringify(newData))
}
export const checkSameShortcut = (key) => {
  return Object.keys(getShortcut()).includes(key)
}
export const getShrotcutAction = (store, key) => {
  const actionsMap = {
    nextSong: () => {
      store.changeSong(1)
    },
    prevSong: () => {
      store.changeSong(2)
    },
    volumeUp: () => {
      store.setVolume(null, 'up')
    },
    volumeDown: () => {
      store.setVolume(null, 'down')
    },
    playOrPause: () => {
      store.changeSwitch()
    },
    space: () => {
      store.changeSwitch()
    },
  }
  return actionsMap[key]
}
/** 获取当前快捷键,可匹配组合快捷键*/
export const getCurrShortcut = (e) => {
  const keys = []
  // 构建快捷键字符串
  // 不能用if else 的，因为这样无法匹配组合的快捷键
  if (e.ctrlKey) keys.push('Control')
  if (e.shiftKey) keys.push('Shift')
  if (e.altKey) keys.push('Alt')
  if (e.key === ' ') keys.push('Space')
  if (
    e.key !== 'Control' &&
    e.key !== 'Shift' &&
    e.key !== 'Alt' &&
    e.key !== ' '
  ) {
    keys.push(e.key)
  }
  return keys.join('+')
}

export const initShortcutSystem = (store) => {
  reigsterShortcut()

  window.addEventListener('keydown', (e) => {
    const shortcutKey = getCurrShortcut(e)
    console.log('按下快捷键: ', shortcutKey)
    //获取localStrorage中的快捷键 对应的action
    const actionName = getShortcut()[shortcutKey]
    // 如果快捷键不存在，则不执行任何操作
    if (!actionName) return

    // 如果快捷键存在，则执行对应的action
    const action = getShrotcutAction(store, actionName)
    if (action) {
      e.preventDefault()
      //   console.log('🈯', action)
      action()
    }
  })
}
