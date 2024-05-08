// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import musicFooter from '@/components/musicFooter/index.vue'
import svgLogo from '@/components/menuIcons/logo.vue'
import svgLove from '@/components/menuIcons/love.vue'
import svgChoiceness from '@/components/menuIcons/choiceness.vue'
import svgBoKe from '@/components/menuIcons/boke.vue'
import svgSYJ from '@/components/menuIcons/shoyinji.vue'
import svgHome from '@/components/menuIcons/recommend.vue'
import svgShequ from '@/components/menuIcons/shequ.vue'
import svgZuiJin from '@/components/menuIcons/zuijin.vue'
import svgMyBoKe from '@/components/menuIcons/WDBoKe.vue'
import svgCollect from '@/components/menuIcons/collect.vue'
import svgDownload from '@/components/menuIcons/downLoad.vue'
import svgLocal from '@/components/menuIcons/local.vue'
import svgCloud from '@/components/menuIcons/cloud.vue'
import svgBack from '@/components/headerIcons/back.vue'
import svgVoice from '@/components/headerIcons/voice.vue'
import svgSetting from '@/components/headerIcons/setting.vue'
import svgPersonal from '@/components/headerIcons/personal.vue'
import svgMini from '@/components/headerIcons/minimize.vue'
import svgMax from '@/components/headerIcons/maxmize.vue'
import svgMiniModel from '@/components/headerIcons/mini.vue'
import svgMail from '@/components/headerIcons/mail.vue'
import svgDown from '@/components/headerIcons/down.vue'
import svgClose from '@/components/headerIcons/closeApp.vue'
import svgLine from '@/components/headerIcons/line.vue'
import svgLogout from '@/components/headerIcons/logout.vue'
import svgPlay from '@/components/mainIcons/play.vue'
import svgTriangle from '@/components/mainIcons/triangle.vue'

const allGlobalComponents = {
  musicFooter,
  svgLogo,
  svgHome,
  svgChoiceness,
  svgBoKe,
  svgSYJ,
  svgShequ,
  svgLove,
  svgZuiJin,
  svgMyBoKe,
  svgCollect,
  svgDownload,
  svgLocal,
  svgCloud,
  svgBack,
  svgVoice,
  svgSetting,
  svgPersonal,
  svgMini,
  svgMax,
  svgMiniModel,
  svgMail,
  svgDown,
  svgClose,
  svgLine,
  svgLogout,
  // main界面图标
  svgPlay,
  svgTriangle,
}
export default {
  install(app) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
    //注册allGlobalComponents中的所有组件作为全局组件
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key])
    })
  },
}
