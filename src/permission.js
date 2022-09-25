import {router, addRoutes} from './router/index.js'
import {getToken} from "./util/auth.js";
import {hideFullLoading, showFullLoading, toast} from "./util/uril.js";
import store from "./store/index.js";

let hasGetInfo = false;
//全局前置守卫
router.beforeEach(async (to, from, next) => {
    showFullLoading()
    const token = getToken()
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
    //已经登录，获取用户信息
    let hasNewRoutes = false
    if (token && !hasGetInfo) {
        await store.dispatch('user/handleUserInfo')
        let menus = store.getters.menus
        hasGetInfo = true
        //动态添加路由
        hasNewRoutes = addRoutes(menus)
    }
    // 设置页面标题
    document.title = (to.meta.title ? to.meta.title : "") + "-backgroundSystem"
    hasNewRoutes ? next(to.fullPath) : next()

})
// 全局后置守卫
router.afterEach((to, from) => {
    hideFullLoading()
})