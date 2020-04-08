import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'

Vue.use(Router)

const router = new Router({
    linkExactActiveClass: 'active',
    routes: [
        {
            path: '/',
            redirect: 'Coronavirus Dashboard',
            component: DashboardLayout,
            children: [
                {
                    path: '/dashboard',
                    name: 'Coronavirus Dashboard',
                    component: () => import('./views/Dashboard.vue')
                }
            ]
        }
    ]
})

export default router