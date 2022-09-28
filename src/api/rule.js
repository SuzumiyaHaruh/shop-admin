import instance from "../util/request";

export const getRuleList = (page) => {
    return instance.get(`/admin/rule/${page}`)
}
export const createRule = (data) => {
    return instance({
        url: "/admin/rule",
        method: 'POST',
        params: data
    })
}
export const updateRule = (id, data) => {
    return instance({
        url: "/admin/rule/" + id,
        method: 'POST',
        params: data
    })
}
export function deleteRule(id){
    return instance.post(`/admin/rule/${id}/delete`)
}
export function updateRuleStatus(id,status){
    return instance.post(`/admin/rule/${id}/update_status`,{
        status
    })
}