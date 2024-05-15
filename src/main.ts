import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'

//在main.css之前引入，后面我们需要去覆盖vant的样式
import 'vant/lib/index.css'
import './styles/main.scss'

import 'virtual:svg-icons-register'
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
