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
    return ElMessageBox.prompt(title, tip, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValue: value
    })
}
// 将query对象转成url参数
export const queryParams = (query) => {
    let q = []
    for (const key in query) {
        if (query[key]) {
            q.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    let r = q.join("&")
    r = r ? ("?" + r) : ""
    return r
}
// 上移
export const useArrayMoveUp = (arr, index) => {
    swapArray(arr, index, index - 1)
}

// 下移
export const useArrayMoveDown = (arr, index) => {
    swapArray(arr, index, index + 1)
}

const swapArray = (arr, index1, index2) => {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0]
    return arr
}


// sku排列算法
export function cartesianProductOf() {
    return Array.prototype.reduce.call(arguments, function (a, b) {
        var ret = [];
        a.forEach(function (a) {
            b.forEach(function (b) {
                ret.push(a.concat([b]));
            });
        });
        return ret;
    }, [
        []
    ]);
}