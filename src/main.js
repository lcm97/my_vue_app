import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'

import { Lazyload } from 'vant';

createApp(App).use(Lazyload, { lazyComponent: true }).use(Vant).use(store).use(router).mount('#app')