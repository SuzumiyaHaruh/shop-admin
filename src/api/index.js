import instance from "../util/request.js";

/**
 * 获取后台数据1
 * @returns {*}
 */
export const getStatistics1 = () => {
    return instance({
        url: '/admin/statistics1',
        method: 'GET',
    })
}
/**
 * 获取后台数据2
 */
export const getStatistics2 = () => {
    return instance({
        url: '/admin/statistics2',
        method: 'GET',
    })
}
/**
 * 获取后台数据3
 */
export const getStatistics3 = (hour) => {
    return instance({
        url: `/admin/statistics3?type=${hour}`,
        method: 'GET',
    })
}