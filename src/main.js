import Vue from 'vue'
import App from './App.vue'
import AsyncComputed from 'vue-async-computed'
import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";
polyfillCountryFlagEmojis();
Vue.use(AsyncComputed)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
