import Vue from 'vue'
import Router from 'vue-router'
import pUsuario from '@/views/pUsuario'
import pDashboard from '@/views/pDashboard'

Vue.use(Router)


var routes = [
    { name: 'home', path: '/', redirect: { name: 'pDashboard', path: '/dashboard', component: pDashboard } },
    { name: 'pUsuario', path: '/users', component: pUsuario }
    , { name: 'pDashboard', path: '/dashboard', component: pDashboard }]

var router = new Router({ routes })


export default router