import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/pages/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login.vue')
    },
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/404.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router