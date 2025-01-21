export default function (url) {
  const init = (url) => {
    return new Promise(async (resolve, reject) => {
      //handleRgbaArr中存在图形加载这个异步操作
      const rgbaArr = await handleRgbaArr(url)
      const mostRgbaArr = VividColorArr(rgbaArr)
      const mostVividColor = getMostVividColor(mostRgbaArr)
      // console.log(mostVividColor)
      resolve(mostVividColor)
    })
  }

  /**
   * @description: 图像中每个像素点数据
   * @param {number[]}
   * @return {Array<[string, number]>}
   */
  const handleRgbaArr = (url) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      //图片加载为异步,添加事件回调,在内部处理图片信息
      const img = new Image()
      img.src = url
      img.addEventListener('load', () => {
        //🟥这里很关键，会直接影响主页加载时间
        //   ❌通常是根据图片比例来控制画布大小，让图片等比例或原模原样画到canvas上，保持canvas和图片完美融合
        //   🈯但是这样会导致提取算法非常耗时，于是选择将图片都变成100*100的大小，不保持图片原本比例，同时让图片画到100*100的canvas上，这样可以保证图片全部被画到画布上，这样对算法速度有极大的提升
        const imgWidth = 100
        const imgHeight = 100
        canvas.width = 100
        canvas.height = 100
        // drawImage的4，5参数表示图片画到canvas的宽高，🈯自带缩放
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight)
        const { data: imgData } = ctx.getImageData(0, 0, imgWidth, imgHeight)
        resolve(imgData)
      })
    }).catch((err) => {
      reject(err)
    })
  }

  /**
   * @description: 整理像素点数据，统计每组像素点出现次数
   * @param {number[]}
   * @return {Array<[string, number]>}
   */
  const VividColorArr = (imgData) => {
    const totalData = []
    //🟥整个数组中:每4个数组元素就是一个rbga像素信息,rgba(r,g,b,a)
    //  将每个像素点的RGBA信息存入数组
    for (let i = 0; i < imgData.length; i += 4) {
      const r = imgData[i]
      const g = imgData[i + 1]
      const b = imgData[i + 2]
      const a = imgData[i + 3]
      totalData.push([r, g, b, a])
    }
    //r记录每个像素点RGBA出现的次数
    const r = new Map()
    //统计每个像素点出现的次数
    totalData.forEach((i) => {
      const check = r.get(i.join())
      if (check) r.set(i.join(), check + 1)
      else r.set(i.join(), 1)
    })
    const resultArr = Array.from(r) //Map转换为数组 [ 像素信息 , 出现次数 ]
    const result = resultArr.sort((a, b) => b[1] - a[1]) //像素点降序排序
    //拿出像素数量重复度前五个RGBA数组
    // console.log(result)
    return result.slice(0, 5)
  }

  /**
   * @description: 获取像素点重复次数前5中饱和度最高rbga数据
   * @param {Array<[string, number]>}
   * @return {string}
   */
  const getMostVividColor = (colors) => {
    let vividColor = []
    colors.forEach((color) => {
      // 分离颜色信息
      let [r, g, b, a] = color[0].split(',')
      r = Number(r)
      g = Number(g)
      b = Number(b)
      // 计算亮度brightness
      let brightness = (r + g + b) / 3
      // 计算饱和度saturation
      let max = Math.max(r, g, b)
      let min = Math.min(r, g, b)
      let saturation = (max - min) / max
      // 将计算结果放入数组vividColor
      vividColor.push([color, saturation])
    })
    //对鲜艳度RGBA数组排序,跳出最鲜艳的并返回
    vividColor = vividColor.sort((a, b) => b[1] - a[1])
    //🟥vividColor结构  ->  [ [ ['r,g,b,a',重复次数 ],饱和度指标 ] , ...... ]
    return vividColor[0][0][0]
  }
  /**
   * 主题色变亮
   * @param {String} color
   * @param {Number} value
   * @return {String}
   */
  const lightColor = (color, value) =>
    color
      .split(',')
      .slice(0, -1)
      .map((i) => Math.max(0, +i - value))
      .join()

  /**
   * 主题色变暗
   * @param {String} color
   * @param {Number} value
   * @return {String}
   */
  const dimColor = (color, value) =>
    color
      .split(',')
      .slice(0, -1)
      .map((i) => Math.min(255, +i + value))
      .join()

  return init(url)
}
