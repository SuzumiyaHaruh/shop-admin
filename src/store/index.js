import {createStore} from 'vuex'
import getters from "./getters.js";
import user from './modules/user.js'
import main from './modules/main.js'
import createPersistedState from 'vuex-persistedstate'
const store = createStore({
    getters,
    //模块
    modules: {
        user,
        main
    },
    // 持久化
    plugins: [
        createPersistedState({
            key: '__front__',
            paths: ['user','main']
        })
    ]
})
export default store