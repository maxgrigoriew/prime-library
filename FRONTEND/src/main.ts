import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import {createNewRouter} from './router'
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(createNewRouter())
app.use(ElementPlus)
app.mount('#app')
