import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { thousandsSeparatorDirective } from '@/directives'

const app = createApp(App)

app.directive('thousands-separator', thousandsSeparatorDirective)

app.mount('#app')
