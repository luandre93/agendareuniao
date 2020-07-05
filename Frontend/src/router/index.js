import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import app from '@/App'
import pUsuario from '@/views/pUsuario'
import pDashboard from '@/views/pDashboard'
import pReuniao from '@/views/pReuniao'
import pLogin from '@/views/pLogin'
import pRelatorio from '@/views/pRelatorio'
import error404 from '@/views/Error404'


Vue.use(Router)

export default new VueRouter({
    mode: 'history',
    routes: [
        //Rota de Login
        { path: '/login', name: 'pLogin', component: pLogin },
        //Rota da Aplicação
        {
            path: '/app',
            name: 'app',
            component: app,
            children: [
                { name: 'pUsuario', path: '/users', component: pUsuario },
                { name: 'pDashboard', path: '/dashboard', component: pDashboard },
                { name: 'pReuniao', path: '/dashboard/:id', component: pReuniao },
                { name: 'pRelatorio', path: '/relatorios', component: pRelatorio },

            ]
        },
        //Redirecionamento da Pagina
        { path: '/', redirect: '/login' },
        //Rota Curinga
        { path: '*', component: error404 }
    ]
})