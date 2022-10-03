import instance from "../util/request.js";

export function getCategoryList() {
    return instance.get("/admin/category")
}

export function createCategory(data) {
    return instance.post("/admin/category", data)
}

export function updateCategory(id, data) {
    return instance.post("/admin/category/" + id, data)
}

export function updateCategoryStatus(id, status) {
    return instance.post(`/admin/category/${id}/update_status`, {
        status
    })
}

export function deleteCategory(id) {
    return instance.post(`/admin/category/${id}/delete`)
}

export function getCategoryGoods(id) {
    return instance.get(`/admin/app_category_item/list?category_id=${id}`)
}
export function deleteCategoryGoods(id){
    return instance.post(`/admin/app_category_item/${id}/delete`)
}
export function connectCategoryGoods(data){
    return instance.post(`/admin/app_category_item`,data)
}