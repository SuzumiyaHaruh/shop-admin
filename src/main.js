import {createApp} from 'vue'
import 'normalize.css/normalize.css'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {router} from "./router/index.js";
import store from "./store/index.js";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

import './permission.js'
import "nprogress/nprogress.css"
import permission from "./directives/permission.js"
app.use(permission)
app.mount('#app')