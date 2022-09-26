import instance from "../util/request.js";

/**
 * 获取图片列表
 * @param id
 * @param page
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getImageList = (id, page = 1) => {
    return instance.get(`/admin/image_class/${id}/image/${page}`)
}

/**
 * 重命名图片
 * @param id
 * @param name
 * @returns {*}
 */
export const updateImage = (id, name) => {
    return instance({
        url: `/admin/image/${id}`,
        method: 'POST',
        params: {name}
    })
}
/**
 * 删除图片
 * @param ids
 * @returns {*}
 */
export const deleteImage = (ids) => {
    return instance({
        url: `/admin/image/delete_all`,
        method: 'POST',
        params: {ids}
    })
}
export const UPLOAD_IMAGE_ACTION = "/api/admin/image/upload"