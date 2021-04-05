import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
//import VueWechatTitle from 'vue-wechat-title'
import 'vant/lib/index.css'

import { Lazyload } from 'vant';

//import vConsole from '@/utils/vconsole.js'


//createApp(App).use(Lazyload, { lazyComponent: true }).use(Vant).use(store).use(router).use(vConsole).use(require('vue-wechat-title')).mount('#app')
createApp(App).use(Lazyload, { lazyComponent: true }).use(Vant).use(store).use(router).use(require('vue-wechat-title')).mount('#app')