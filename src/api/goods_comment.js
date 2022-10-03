import {queryParams} from "../util/uril.js";
import instance from "../util/request.js";

export function getGoodsCommentList(page, query = {}) {
    let r = queryParams(query)
    return instance.get(`/admin/goods_comment/${page}${r}`)
}


export function updateGoodsCommentStatus(id, status) {
    return instance.post(`/admin/goods_comment/${id}/update_status`, {
        status
    })
}
export function reviewGoodsComment(id,data){
    return instance.post(`/admin/goods_comment/review/${id}`,{
        data
    })
}

