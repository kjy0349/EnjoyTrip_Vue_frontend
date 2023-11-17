import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
const pinia = createPinia()

app.config.productionTip = false

app.use(pinia)
app.use(router)
app.use(Antd)

router.isReady().then(() => {
  app.mount('#app')
})
