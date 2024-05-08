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

//❓❓❓组件都应该是保持响应式的，根据用户传入的px单位，转化为vw、vh单位
// handleReactiveSize会处理响应式尺寸
// 参数params：1.元素的引用、2.宽度、3.高度
//    内部会让el的尺寸保持响应式
export const singleReactiveSize = (el, width, height) => {
  let computedWidth = 0
  let computedHeight = 0
  // 计算组件的宽高比例
  let rate = width / height
  // ✨先将宽度转化为vw单位,settingInfo.INITSCREENWIDTH是项目打开时的初始宽度,🈯根据它先确定每个元素的vw宽度,方便后续保持响应式比例
  let width1 = (width / settingInfo.INITSCREENWIDTH).toFixed(4) * 100
  // 设置宽度vw
  el.style.width = width1 + 'vw'
  // ✨思路解析：对于同等比例缩放，只需要知道宽高比即可，所以我们首先计算比例rate，随后让宽度设置vw保持响应式，并通过toPx试试计算宽度的px长度，进而结合rate计算出高度的px长度赋值即可
  computedHeight = Math.max(vhToPx(el.style.width) / rate, height)
  el.style.height = computedHeight + 'px'
  // 防抖
  let timeId
  //👇操作是为了让宽高保持比例缩放，当由于width为vw单位，所以屏幕宽度变化时，能够监视到并实时计算height高度
  window.addEventListener('resize', () => {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      //将vw转化为px
      computedHeight = Math.max(vhToPx(el?.style.width) / rate, height)
      if (el) el.style.height = computedHeight + 'px'
    }, 100)
  })
}
