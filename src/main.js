import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import loadScript from 'vue-plugin-load-script'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(loadScript)

app.mount('#app')
