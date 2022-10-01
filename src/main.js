import Vue from 'vue'
import App from './App.vue'
import AsyncComputed from 'vue-async-computed'
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
import VueLazyload from 'vue-lazyload'
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';


const loadimage = require('./assets/loading.svg')

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadimage,
  attempt: 1
})

/* import the fontawesome core */

/* add icons to the library */
library.add(far, fas)


/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)
polyfillCountryFlagEmojis();
Vue.use(AsyncComputed)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
