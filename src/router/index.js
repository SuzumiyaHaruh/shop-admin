import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'admin',
        component: () => import('../layouts/admin.vue'),
        children: [
            {
                path: '/',
                component: () => import('@/pages/index.vue'),
                meta: {
                    title: '后台首页'
                }
            },
            {
                path: '/goods/list',
                component: () => import('@/pages/goods/list.vue'),
                meta: {
                    title: '商品管理'
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login.vue'),
        meta: {
            title: '登录页'
        }
    },
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/404.vue'),
        meta: {
            title: '404'
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router