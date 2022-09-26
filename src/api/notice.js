import instance from "../util/request.js";

/**
 * 获取公告
 * @param page
 * @returns {*}
 */
export const getNoticeList = (page) => {
    return instance({
        url: `/admin/notice/${page}`,
        method: 'GET',
    })
}
/**
 * 创建通知
 */
export const createNotice = (data) => {
    return instance({
        url: "/admin/notice",
        method: 'POST',
        params: data
    })
}
export const updateNotice=(id,data)=>{
    return instance({
        url: "/admin/notice/"+id,
        method: 'POST',
        params: data
    })
}

export const deleteNotice = (id) => {
    return instance({
        url: `/admin/notice/${id}/delete`,
        method: 'POST',
    })
}
