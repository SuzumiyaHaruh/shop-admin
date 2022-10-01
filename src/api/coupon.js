import instance from "../util/request.js";


export function getCouponList(page){
    return instance.get(`/admin/coupon/${page}`)
}

export function createCoupon(data){
    return instance.post("/admin/coupon",data)
}

export function updateCoupon(id,data){
    return instance.post("/admin/coupon/"+id,data)
}

export function deleteCoupon(id){
    return instance.post(`/admin/coupon/${id}/delete`)
}

export function updateCouponStatus(id){
    return instance.post(`/admin/coupon/${id}/update_status`,{
        status:0
    })
}