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

/**
 * 获取管理员权限
 * @param page
 * @param query
 * @returns {*}
 */
export function getManagerList(page, query = {}) {
    let q = []
    for (const key in query) {
        if (query[key]) {
            q.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    let r = q.join("&")
    r = r ? ("?" + r) : ""

    return instance.get(`/admin/manager/${page}${r}`)
}

/**
 * 修改管理员状态
 * @param id
 * @param status
 * @returns {*}
 */
export function updateManagerStatus(id, status) {
    return instance.post(`/admin/manager/${id}/update_status`, {
        status
    })
}

export function createManager(data) {
    return instance.post(`/admin/manager`, data)
}

export function updateManager(id, data) {
    return instance.post(`/admin/manager/${id}`, data)
}

export function deleteManager(id) {
    return instance.post(`/admin/manager/${id}/delete`)
}
