import instance from "../util/request.js";
import {queryParams} from "../util/uril.js";


export function getOrderList(page, query = {}) {
    let r = queryParams(query)
    return instance.get(`/admin/order/${page}${r}`)
}


export function deleteOrder(ids) {
    return instance.post(`/admin/order/delete_all`, {
        ids
    })
}
export function exportOrder(query = {}){
    let r = queryParams(query)
    return instance.post(`/admin/order/excelexport${r}`,{},{
        responseType:"blob"
    })
}

export function getShipInfo(id){
    return instance.get(`/admin/order/${id}/get_ship_info`)
}

export function refundOrder(id,data){
    return instance.post(`/admin/order/${id}/handle_refund`,data)
}
