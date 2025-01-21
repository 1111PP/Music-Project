import settingInfo from '@/setting.js'
//转化px为vw、vh单位的数据
export const pxToVh = (size) => {
  if (typeof size === 'string') size = Number(size.slice(0, -2))
  return (size / window.innerWidth).toFixed(2) * 100
}
export const vhToPx = (vhSize) => {
  if (typeof vhSize === 'string') vhSize = Number(vhSize.slice(0, -2))
  return (vhSize / 100) * window.innerWidth
}
