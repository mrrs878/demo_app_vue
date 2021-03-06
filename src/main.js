import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import MHeader from '@/components/MHeader'
import MIcon from '@/components/MIcon'
import MScroll from '@/components/MScroll'

import { Swipe, SwipeItem, Toast, Lazyload, Tab, Tabs } from 'vant'

import { request } from '@/api'
import { AjaxError, before, after } from '@/utils/tool'

Vue.component('MHeader', MHeader)
Vue.component('MIcon', MIcon)
Vue.component('MScroll', MScroll)

Vue.use(Swipe).use(SwipeItem)
Vue.use(Tab).use(Tabs)
Vue.use(Lazyload)

Vue.prototype.request = request
Vue.prototype.toast = Toast

Window.AjaxError = AjaxError
Function.prototype.before = before
Function.prototype.after = after

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
