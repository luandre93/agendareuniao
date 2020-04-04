import Vue from 'vue'
import Router from 'vue-router'
import pUsuario from '@/views/pUsuario'

Vue.use(Router)

var routes = [{ name: 'pUsuario', path: '/users', component: pUsuario }]
var router = new Router({ routes })


export default router