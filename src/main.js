import { createApp } from 'vue'
import App from './App.vue'
import pinia from '@/store/index.js'
import router from '@/router/index.js'
//引入模板的全局的样式,若想使用全局scss变量需要在vite.config中配置
//Element-Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' //El-Plus默认主题色文件，此处我们替换了它里面的样式
//移动端适配插件:根据窗口调整html-font-size大小、达到适配效果
import 'amfe-flexible'
// 2. 引入组件样式
import 'vant/lib/index.css'
//全局注册VantUI组件
import vantUI from '@/components/VantUI/index.js'
//清除默认样式
// import 'normalize.css/normalize.css'
//引入svg字体图标
import gloablComponents from '@/components/index.js'

// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
const app = createApp(App)
app.use(gloablComponents)
app.use(pinia)
app.use(vantUI)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
