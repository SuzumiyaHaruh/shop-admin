import instance from "../util/request.js";

export function getCategoryList(){
    return  instance.get("/admin/category")
}