import {queryParams} from "../util/uril.js";
import instance from "../util/request.js";

export function getGoodsList(page, query = {}) {
    let r = queryParams(query)
    return instance.get(`/admin/goods/${page}${r}`)
}


export function updateGoodsStatus(ids, status) {
    return instance.post(`/admin/goods/changestatus`, {
        ids,
        status
    })
}


export function createGoods(data) {
    return instance.post(`/admin/goods`, data)
}

export function updateGoods(id, data) {
    return instance.post(`/admin/goods/${id}`, data)
}

export function deleteGoods(ids) {
    return instance.post(`/admin/goods/delete_all`, {
        ids
    })
}

export function readGoods(id) {
    return instance.get(`/admin/goods/read/${id}`)
}

export function setGoodsBanner(id, data) {
    return instance.post(`/admin/goods/banners/${id}`, data)
}

export function updateGoodsSkus(id, data) {
    return instance.post(`/admin/goods/updateskus/${id}`, data)
}

export function createGoodsSkusCard(data) {
    return instance.post(`/admin/goods_skus_card`, data)
}

export function updateGoodsSkusCard(id, data) {
    return instance.post(`/admin/goods_skus_card/${id}`, data)
}

export function deleteGoodsSkusCard(id) {
    return instance.post(`/admin/goods_skus_card/${id}/delete`)
}

export function sortGoodsSkusCard(data) {
    return instance.post(`/admin/goods_skus_card/sort`, data)
}

export function createGoodsSkusCardValue(data) {
    return instance.post(`/admin/goods_skus_card_value`, data)
}

export function updateGoodsSkusCardValue(id, data) {
    return instance.post(`/admin/goods_skus_card_value/${id}`, data)
}
export function deleteGoodsSkusCardValue(id){
    return instance.post(`/admin/goods_skus_card_value/${id}/delete`)
}
export function chooseAndSetGoodsSkusCard(id,data){
    return instance.post(`/admin/goods_skus_card/${id}/set`,data)
}
export function restoreGoods(ids){
    return instance.post(`/admin/goods/restore`,{
        ids
    })
}
export function destroyGoods(ids){
    return instance.post(`/admin/goods/destroy`,{
        ids
    })
}
