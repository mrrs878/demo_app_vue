import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import MHeader from '@/components/MHeader'
import MIcon from '@/components/MIcon'
import MScroll from '@/components/MScroll'

import { Swipe, SwipeItem, Toast, Lazyload } from 'vant'

import { request } from '@/api'
import { AjaxError, before, after } from '@/utils/tool'

Vue.component('MHeader', MHeader)
Vue.component('MIcon', MIcon)
Vue.component('MScroll', MScroll)

Vue.use(Swipe).use(SwipeItem)
Vue.use(Toast)
Vue.use(Lazyload)

Vue.prototype.request = request

Window.AjaxError = AjaxError
Function.prototype.before = before
Function.prototype.after = after

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
