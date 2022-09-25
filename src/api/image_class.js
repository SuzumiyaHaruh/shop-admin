import instance from "../util/request.js";

/**
 * 获取图库列表
 * @param page
 * @returns {*}
 */
export const getImageClassList = (page) => {
    return instance({
        url: "/admin/image_class/" + page,
        method: "GET",
    })
}
/**
 * 增加图库分类
 */
export const createImageClass = (data) => {
    return instance({
        url: "/admin/image_class",
        method: "POST",
        params: data
    })
}
/**
 * 修改图库分类
 */
export function updateImageClass(id,data){
    return instance.post("/admin/image_class/"+id,data)
}
export function deleteImageClass(id){
    return instance.post(`/admin/image_class/${id}/delete`)
}