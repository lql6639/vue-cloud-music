import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getVant from './plugins'
import Vue3Marquee from 'vue3-marquee'

const app = createApp(App)
getVant(app)
app.use(Vue3Marquee)
app.use(store)
app.use(router).mount('#app')
