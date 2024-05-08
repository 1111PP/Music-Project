import {
  Button,
  NoticeBar,
  ConfigProvider,
  Barrage,
  Field,
  CellGroup,
  Watermark,
  Cell,
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
  Cell,
]

export default {
  install(app) {
    allUI.forEach((item) => app.use(item))
  },
}
