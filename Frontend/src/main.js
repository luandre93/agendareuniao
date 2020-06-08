import Vue from 'vue';
import App from './App.vue';
import router from '@/router';


import 'typeface-roboto';
import 'bootstrap/dist/js/waves-effect.js';
import 'bootstrap/js/dist/modal.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/custom.css';
import 'font-awesome/css/font-awesome.min.css';


Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')

