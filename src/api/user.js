import instance from "../util/request.js";
import {queryParams} from "../util/uril.js";


export function getUserList(page,query = {}){
    let r = queryParams(query)
    return instance.get(`/admin/user/${page}${r}`)
}


export function updateUserStatus(id,status){
    return instance.post(`/admin/user/${id}/update_status`,{
        status
    })
}


export function createUser(data){
    return instance.post(`/admin/user`,data)
}

export function updateUser(id,data){
    return instance.post(`/admin/user/${id}`,data)
}

export function deleteUser(id){
    return instance.post(`/admin/user/${id}/delete`)
}