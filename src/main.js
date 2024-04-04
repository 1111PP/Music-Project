import { createApp } from 'vue'
import App from './App.vue'
//boot-strap
import '/src/assets/styles.scss'
import '@popperjs/core'
import 'bootstrap'
//引入模板的全局的样式,若想使用全局scss变量需要在vite.config中配置
import '@/styles/index.scss'

createApp(App).mount('#app')
