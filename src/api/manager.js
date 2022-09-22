import instance from "../util/request.js";
import * as util from "util";

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
export const getLogout = () => {
    return instance({
        url: 'admin/logout',
        method: 'POST',
    })
}
/**
 * 修改密码
 * @returns {*}
 */
export const getUpdatePassword = ({oldpassword, password, repassword}) => {
    return instance({
        url: 'admin/updatepassword',
        method: 'POST',
        params: {oldpassword, password, repassword}
    })
}
