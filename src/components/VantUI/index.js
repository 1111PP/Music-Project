import {
  Button,
  NoticeBar,
  ConfigProvider,
  Barrage,
  Field,
  CellGroup,
  Watermark,
} from 'vant'
// import
const allUI = [
  Watermark,
  ConfigProvider,
  NoticeBar,
  Button,
  Barrage,
  Field,
  CellGroup,
]

export default {
  install(app) {
    allUI.forEach((item) => app.use(item))
  },
}
