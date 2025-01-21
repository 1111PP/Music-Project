//格式化时间
export const formatTime = (time) => {
  time = Math.floor(Number(time))
  let minute = Math.floor(time / 60)
  let second = Math.floor(time % 60)
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  return `${minute}:${second}`
}
