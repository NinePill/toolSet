import { createApp } from 'vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia} from "pinia"
import persis from "pinia-plugin-persistedstate"
import App from './App.vue'


const app = createApp(App)
const pinia = createPinia()
app.use(pinia.use(persis))
app.mount('#app')