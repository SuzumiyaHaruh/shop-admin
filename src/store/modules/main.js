import {getInfo, getLogin, getLogout} from "../../api/manager.js";
import {removeToken, setToken} from "../../util/auth.js";

export default {
    namespaced: true,
    state() {
        return {
            // 侧边宽度
            asideWidth: "250px",
            menus: []
        }
    },
    mutations: {
        //记录菜单
        SET_MENUS(state, menus) {
            state.menus = menus
        },
        //  展开/缩起侧边
        handleAsideWidth(state) {
            state.asideWidth = state.asideWidth === '250px' ? '64px' : '250px'
        }
    },
    actions: {}
}