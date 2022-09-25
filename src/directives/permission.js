import store from "@/store"

/**
 * 自定义指令
 * @param value
 * @param el
 * @returns {boolean}
 */
function hasPermission(value, el = false) {
    if (!Array.isArray(value)) {
        throw new Error(`需要配置权限，例如 v-permission="['getStatistics3,GET']"`)
    }
    //当传入规则不在rule规则里面
    const hasAuth = value.findIndex(v => store.getters.ruleNames.includes(v)) !== -1
    if (el && !hasAuth) {
        //删除节点
        el.parentNode && el.parentNode.removeChild(el)
    }
    return hasAuth
}

export default {
    install(app) {
        app.directive("permission", {
            mounted(el, binding) {
                hasPermission(binding.value, el)
            }
        })
    }
}