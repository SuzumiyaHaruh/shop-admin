import {ElNotification} from "element-plus";
// 消息提示
export const toast = (title, message, type) => {
    ElNotification({
        title,
        message,
        type,
        duration: 3000
    })
}