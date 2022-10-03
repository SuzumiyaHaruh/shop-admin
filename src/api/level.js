import instance from "../util/request.js";

export function getUserLevelList(page) {
    return instance.get(`/admin/user_level/${page}`)
}

export function createUserLevel(data) {
    return instance.post("/admin/user_level", data)
}

export function updateUserLevel(id, data) {
    return instance.post("/admin/user_level/" + id, data)
}

export function deleteUserLevel(id) {
    return instance.post(`/admin/user_level/${id}/delete`)
}

export function updateUserLevelStatus(id, status) {
    return instance.post(`/admin/user_level/${id}/update_status`, {
        status
    })
}