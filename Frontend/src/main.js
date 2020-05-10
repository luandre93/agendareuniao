import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import 'typeface-roboto';

import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/waves-effect.js'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/custom.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

