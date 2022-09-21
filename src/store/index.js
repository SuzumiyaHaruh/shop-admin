import {createStore} from 'vuex'
import getters from "./getters.js";
import user from './modules/user.js'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
    getters,
    //模块
    modules: {
        user
    },
    // 持久化
    plugins: [
        createPersistedState({
            key: '__front__',
            paths: ['user']
        })
    ]
})
export default store