import './assets/main.css'
import './app-layout.css'
import 'flowbite'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Inicializa o estado de autenticação antes de montar
const auth = useAuthStore()
auth.initialize().then(() => {
  app.mount('#app')
})
