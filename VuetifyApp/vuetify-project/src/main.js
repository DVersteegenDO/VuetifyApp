/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import RequestItem from './components/RequestComponent.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.component('request-item', RequestItem)

registerPlugins(app)

app.mount('#app')
