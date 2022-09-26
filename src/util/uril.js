import {ElNotification, ElMessageBox, ElMessage} from "element-plus";
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
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type,
        }
    )
}

// 显示全屏loading
export const showFullLoading = () => {
    NProgress.start()
}

// 隐藏全屏loading
export const hideFullLoading = () => {
    NProgress.done()
}
//弹出输入框
 export const showPrompt = (title, tip, value) => {
   return  ElMessageBox.prompt(title, tip, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: value
    })
}