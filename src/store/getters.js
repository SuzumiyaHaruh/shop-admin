export default {
    //用户信息
    user(state) {
        return state.user.user
    },
    //管理员权限
    ruleNames(state) {
        return state.user.ruleNames
    },

    //侧边宽度
    asideWidth(state) {
        return state.main.asideWidth
    },
    //菜单
    menus(state) {
        return state.main.menus
    }
}