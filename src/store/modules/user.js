import {getInfo, getLogin} from "../../api/manager.js";
import {setToken} from "../../util/auth.js";
import store from "../index.js";

export default {
    namespaced: true,
    state() {
        return {
            //用户信息
            user: {}
        }
    },
    mutations: {
        /**
         *记录用户信息
         * @param state
         * @param user
         * @constructor
         */
        SET_USERINFO(state, user) {
            state.user = user
        }
    },
    actions: {
        /**
         * 登录，获取token
         * @param context
         * @param username
         * @param password
         * @returns {Promise<void>}
         */
        async handleLogin(context, {username, password}) {
            const res = await getLogin(username, password)
            setToken(res.token)
            //获取用户信息
            await context.dispatch('handleUserInfo')
        },
        /*
         * 获取用户信息
         * @param context
         * @returns {Promise<void>}
         */
        async handleUserInfo(context) {
            await getInfo().then(res => {
                context.commit('SET_USERINFO', res)
            })
        }
    }
}