import {ElNotification, ElMessageBox} from "element-plus";
import NProgress from "nprogress";
// 消息提示
export const toast = (title, message, type) => {
    ElNotification({
        title,
        message,
        type,
        duration: 3000
    })
}
/**
 *弹出提示框
 */
export const showModal = (content, type, title) => {
    return ElMessageBox.confirm(
        content,
        title,
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: type,
        }
    )
}
// 显示全屏loading
export const showFullLoading=()=>{
    NProgress.start()
}

// 隐藏全屏loading
export const hideFullLoading=()=>{
    NProgress.done()
}