import {reactive, ref} from "vue";
import {getLogout, getUpdatePassword} from "../api/manager.js";
import {showModal, toast} from "./uril.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export const useRePassword = () => {
    const router = useRouter()
    const store = useStore()
    const formDrawerRef = ref(null)
// 表单ref
    const formRef = ref(null)
//表单数据
    const form = reactive({
        oldpassword: '',
        password: '',
        repassword: ''
    })
//表单校验
    const rules = {
        oldpassword: [
            {
                required: true,
                message: '旧密码不能为空',
                trigger: 'blur'
            },
        ],
        password: [
            {
                required: true,
                message: '新密码不能为空',
                trigger: 'blur'
            },
        ],
        repassword: [
            {
                required: true,
                message: '确认密码不能为空',
                trigger: 'blur'
            },
        ]
    }
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) {
                return false;
            }
            formDrawerRef.value.showLoading()
            // 修改密码
            getUpdatePassword(form).then(() => {
                toast('success', '修改成功', 'success')
                router.push('/login')
            }).finally(() => {
                formDrawerRef.value.hideLoading()
            })
        })
    }
    const openRePasswordForm = () => {
        formDrawerRef.value.open()
    }
    return {
        formDrawerRef, form, formRef, rules, onSubmit, openRePasswordForm
    }
}
/**
 * 退出登录
 */

export const useLogout = () => {
    const router = useRouter()
    const store = useStore()
    const onLogout = () => {
        showModal('是否退出', 'warning', '提示')
            .then(() => {
                getLogout()
                    .finally(() => {
                        //清除信息
                        store.dispatch('user/handleLogout')
                        //跳转回登录页面
                        router.push('/login')
                        //提示退出成功
                        toast('success', '退出成功', 'success')
                    })
            })
    }
    return {onLogout}
}