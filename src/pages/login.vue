<template>
  <el-row class="login-container">
    <!--    左-->
    <el-col :lg="16" :md="12" class="left">
      <div class="text-7xl text-center">background<br/>System</div>
      <div class="text-4xl">welcome</div>
    </el-col>
    <!--    右-->
    <el-col :lg="8" :md="12" class="right">
      <h2>Login</h2>
      <!--      登录表单-->
      <el-form
          :rules="rules"
          :model="form"
          class="w-[250px]"
          ref="formRef">
        <!--        账号-->
        <el-form-item prop="username">
          <el-input v-model="form.username" type="text" placeholder="username" :prefix-icon="User"/>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input show-password v-model="form.password" type="password" placeholder="password" :prefix-icon="Lock"/>
        </el-form-item>
        <!--        登录-->
        <el-form-item>
          <el-button :loading="loading" color="#9f4eea" class="w-[250px]" @click="onSubmit">Login</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import {markRaw, onBeforeUnmount, onMounted, reactive, ref} from 'vue'
import {User, Lock} from '@element-plus/icons-vue'
import {getInfo, getLogin} from "../api/manager.js";
import {useRouter} from 'vue-router'
import {useCookies} from '@vueuse/integrations/useCookies'
import {setToken} from "../util/auth.js";
import {toast} from "../util/uril.js";
import {useStore} from "vuex";

const cookie = useCookies()
const router = useRouter()
const store = useStore()
const loading = ref(false)
// 表单ref
const formRef = ref(null)
//表单数据
const form = reactive({
  username: '',
  password: ''
})
//表单校验
const rules = {
  username: [
    {
      required: true,
      message: 'Please input username',
      trigger: 'blur'
    },
    {
      min: 3, max: 12,
      message: 'Length should be 3 to 12',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur'
    },
    {
      min: 3, max: 12,
      message: 'Length should be 3 to 12',
      trigger: 'blur'
    }
  ]
}
/**
 * login点击事件
 */
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) {
      return false;
    }
    loading.value = true
    //1.登录
    store.dispatch('user/handleLogin', form)
        .then(() => {
          toast('success', '登录成功', 'success')
          router.push('/')
        })
        .finally(() => {
          loading.value = false
        })
  })
}
/**
 * 监听回车事件
 */
const onKeyUp = (e) => {
  if (e.key === 'Enter') {
    onSubmit()
  }
}
/**
 * 添加键盘监听事件
 */
onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})
/**
 * 移除键盘监听
 */
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})
</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-gradient-to-r from-purple-500 to-purple-900
}

.login-container .left, .login-container .right {
  @apply flex items-center justify-center flex-col
}

.login-container .right {
  @apply bg-white
}

.left > div {
  @apply text-purple-400 font-bold
}

.right > h2 {
  @apply text-purple-400 text-4xl font-bold mb-8
}
</style>