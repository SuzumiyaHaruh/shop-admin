import {createApp} from 'vue'
//初始化css
import 'normalize.css/normalize.css'
//引入tailwindcss
import './style.css'
import App from './App.vue'
//element-ui引入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router/index.js";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(router)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}