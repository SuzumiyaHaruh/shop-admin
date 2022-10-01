import instance from "../util/request.js";


export function getSkusList(page){
    return instance.get(`/admin/skus/${page}`)
}

export function createSkus(data){
    return instance.post("/admin/skus",data)
}

export function updateSkus(id,data){
    return instance.post("/admin/skus/"+id,data)
}

export function deleteSkus(ids){
    ids = !Array.isArray(ids) ? [ids] : ids
    return instance.post(`/admin/skus/delete_all`,{ ids })
}

export function updateSkusStatus(id,status){
    return instance.post(`/admin/skus/${id}/update_status`,{
        status
    })
}