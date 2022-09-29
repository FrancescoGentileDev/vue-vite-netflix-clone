import Vue from 'vue'
import App from './App.vue'
import AsyncComputed from 'vue-async-computed'
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
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
