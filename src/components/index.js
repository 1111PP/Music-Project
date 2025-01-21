// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import musicFooter from '@/components/musicFooter/index.vue'

import svgLogo from '@/components/Icons/menuIcons/logo.vue'
import svgLove from '@/components/Icons/menuIcons/love.vue'
import svgChoiceness from '@/components/Icons/menuIcons/choiceness.vue'
import svgBoKe from '@/components/Icons/menuIcons/boke.vue'
import svgSYJ from '@/components/Icons/menuIcons/shoyinji.vue'
import svgHome from '@/components/Icons/menuIcons/recommend.vue'
import svgShequ from '@/components/Icons/menuIcons/shequ.vue'
import svgZuiJin from '@/components/Icons/menuIcons/zuijin.vue'
import svgMyBoKe from '@/components/Icons/menuIcons/WDBoKe.vue'
import svgCollect from '@/components/Icons/menuIcons/collect.vue'
import svgDownload from '@/components/Icons/menuIcons/downLoad.vue'
import svgLocal from '@/components/Icons/menuIcons/local.vue'
import svgCloud from '@/components/Icons/menuIcons/cloud.vue'

import svgBack from '@/components/Icons/headerIcons/back.vue'
import svgVoice from '@/components/Icons/headerIcons/voice.vue'
import svgSetting from '@/components/Icons/headerIcons/setting.vue'
import svgPersonal from '@/components/Icons/headerIcons/personal.vue'
import svgMini from '@/components/Icons/headerIcons/minimize.vue'
import svgMax from '@/components/Icons/headerIcons/maxmize.vue'
import svgMiniModel from '@/components/Icons/headerIcons/mini.vue'
import svgMail from '@/components/Icons/headerIcons/mail.vue'
import svgDown from '@/components/Icons/headerIcons/down.vue'
import svgClose from '@/components/Icons/headerIcons/closeApp.vue'
import svgLine from '@/components/Icons/headerIcons/line.vue'
import svgLogout from '@/components/Icons/headerIcons/logout.vue'

import svgPlay from '@/components/Icons/mainIcons/play.vue'
import svgTriangle from '@/components/Icons/mainIcons/triangle.vue'
import svgBig from '@/components/Icons/mainIcons/big.vue'
import svgContinue from '@/components/Icons/mainIcons/continue.vue'

import svgMysicCollect from '@/components/Icons/footerIcons/collect.vue'
import svgComment from '@/components/Icons/footerIcons/comment.vue'
import svgTransmit from '@/components/Icons/footerIcons/transmit.vue'
import svgPrevSong from '@/components/Icons/footerIcons/prevSong.vue'
import svgNextSong from '@/components/Icons/footerIcons/nextSong.vue'
import svgListPlay from '@/components/Icons/footerIcons/listPlay.vue'
import svgLoopPlay from '@/components/Icons/footerIcons/loopPlay.vue'
import svgRandomPlay from '@/components/Icons/footerIcons/randomPlay.vue'
import svgWords from '@/components/Icons/footerIcons/words.vue'
import svgVipVolume from '@/components/Icons/footerIcons/vipVolume.vue'
import svgWillPlayList from '@/components/Icons/footerIcons/willPlayList.vue'
import svgVolume from '@/components/Icons/footerIcons/volume.vue'
import svgNoVolume from '@/components/Icons/footerIcons/noVolume.vue'
// comment
import svgUpvote from '@/components/Icons/commentIcons/upvote.vue'
//表情包组件
import VEmojiPicker from '@/components/VEmojiPicker/index.vue'
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
  svgBig,
  svgContinue,
  //footer界面图标
  svgMysicCollect,
  svgComment,
  svgTransmit,
  svgPrevSong,
  svgNextSong,
  svgListPlay,
  svgLoopPlay,
  svgRandomPlay,
  svgWords,
  svgVipVolume,
  svgWillPlayList,
  svgVolume,
  svgNoVolume,
  // comment界面图标
  svgUpvote,

  //表情包
  VEmojiPicker,
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
