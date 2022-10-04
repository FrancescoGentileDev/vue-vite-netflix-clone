import Vue from 'vue'
import App from './App.vue'
import AsyncComputed from 'vue-async-computed'
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'
import VueLazyload from 'vue-lazyload'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'


library.add(far, fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)



import loadimage from './assets/loading.svg'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadimage,
  attempt: 3,
  
})

polyfillCountryFlagEmojis()
Vue.use(AsyncComputed)

new Vue(App).$mount('#app')
