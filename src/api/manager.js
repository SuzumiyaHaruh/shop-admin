import instance from "../util/request.js";

/**
 * 登录
 * @param username
 * @param password
 * @returns {*}
 */
export const getLogin = (username, password) => {
    return instance({
        url: '/admin/login',
        method: 'POST',
        params: {username, password}
    })
}
/**
 * 获取管理员信息和权限菜单
 * @returns {*}
 */
export const getInfo = () => {
    return instance({
        url: 'admin/getinfo',
        method: 'POST',
    })
}