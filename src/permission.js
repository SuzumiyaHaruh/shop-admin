import router from './router/index.js'
import {getToken} from "./util/auth.js";
import {toast} from "./util/uril.js";

//全局前置守卫
router.beforeEach((to, from, next) => {
    const token = getToken('admin-token')
    //没有登录，强制跳转回登录页
    if (!token && to.path !== '/login') {
        toast('Error', '请先登录', 'error')
        return next({path: '/login'});
    }
    //用户已登录，跳转回原本页面
    if (token && to.path === '/login') {
        toast('Error', '请勿重复登录', 'error')
        return next({path: from.path ? from.path : '/'});
    }
    next()
})