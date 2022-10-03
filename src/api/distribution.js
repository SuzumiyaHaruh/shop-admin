import instance from "../util/request.js";
import {queryParams} from "../util/uril.js";


export function getAgentList(page,query = {}){
    let r = queryParams(query)
    return instance.get(`/admin/agent/${page}${r}`)
}

export function getAgentOrderList(page,query = {}){
    let r = queryParams(query)
    return instance.get(`/admin/user_bill/${page}${r}`)
}

export function getAgentStatistics(){
    return instance.get("/admin/agent/statistics")
}
export function getConfig(){
    return instance.get(`/admin/distribution_setting/get`)
}

export function setConfig(data){
    return instance.post(`/admin/distribution_setting/set`,data)
}