import instance from "../util/request.js";

export function getRoleList(page) {
    return instance.get(`/admin/role/${page}`)
}

export function createRole(data) {
    return instance.post("/admin/role", data)
}

export function updateRole(id, data) {
    return instance.post("/admin/role/" + id, data)
}

export function setRoleRules(id, rule_ids) {
    return instance.post(`/admin/role/set_rules`, {
        id, rule_ids
    })
}

export function deleteRole(id) {
    return instance.post(`/admin/role/${id}/delete`)
}

export function updateRoleStatus(id, status) {
    return instance.post(`/admin/role/${id}/update_status`, {
        status
    })
}