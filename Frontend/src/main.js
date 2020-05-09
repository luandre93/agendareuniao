import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import 'typeface-roboto';

import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/waves-effect.js'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/custom.css';

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

