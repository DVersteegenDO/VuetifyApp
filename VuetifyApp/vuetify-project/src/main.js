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
import SelectItem from './components/SelectComponent.vue'
import PokemonItem from './components/PokemonComponent.vue'
import WatchItem from './components/WatchComponent.vue'
import TableItem from './components/TableComponent.vue'
import ForItem from './components/ForTestComponent.vue'
import ParentItem from './components/ParentComponent.vue'
import ChildItem from './components/ChildComponent.vue'
import RepositoryItem from './components/RepoComponent.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.component('request-item', RequestItem)
app.component('select-item', SelectItem)
app.component('pokemon-item', PokemonItem)
app.component('watch-item', WatchItem)
app.component('table-item', TableItem)
app.component('for-item', ForItem)
app.component('parent-item', ParentItem)
app.component('child-item', ChildItem)
app.component('repository-item', RepositoryItem)

registerPlugins(app)

app.mount('#app')
