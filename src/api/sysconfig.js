import instance from "../util/request.js";
export function getSysconfig(){
    return instance.get(`/admin/sysconfig`)
}

export function setSysconfig(data){
    return instance.post(`/admin/sysconfig`,data)
}