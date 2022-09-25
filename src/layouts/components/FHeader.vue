<template>
  <div class="f-header">
        <span class="logo">
            <el-icon class="mr-1"><eleme-filled/></el-icon>
            backendSystem
        </span>
    <el-icon class="icon-btn" @click="$store.commit('main/handleAsideWidth')">
      <fold v-if="$store.getters.asideWidth==='250px'"/>
      <Expand v-else/>
    </el-icon>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <refresh/>
      </el-icon>
    </el-tooltip>
    <div class="ml-auto flex items-center">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <full-screen v-if="!isFullscreen"/>
          <aim v-else/>
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-zinc-50">
                    <el-avatar class="mr-2" :size="25" :src="$store.getters.user.avatar"/>
                    {{ $store.getters.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down/>
                    </el-icon>
                </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <!--修改密码抽屉-->
  <form-drawer title="修改密码" size="35%" confirmText="提交" ref="formDrawerRef" @submit="onSubmit">
    <!--    修改密码-->
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码" show-password></el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<script setup>
import {useFullscreen} from '@vueuse/core'
import FormDrawer from "../../components/FormDrawer.vue";
import {useLogout, useRePassword} from "../../util/useManager.js";

const {
  // 是否全屏状态
  isFullscreen,
  // 切换全屏
  toggle
} = useFullscreen()
//退出登录组合api
const {onLogout} = useLogout()
//修改密码组合api
const {
  formDrawerRef,
  form,
  formRef,
  rules,
  onSubmit,
  openRePasswordForm
} = useRePassword()
//监听下拉事件
const handleCommand = (c) => {
  switch (c) {
    case "logout":
      onLogout()
      break;
    case "rePassword":
      openRePasswordForm()
      break;
  }
}
/**
 * 刷新事件
 */
const handleRefresh = () => {
  location.reload()
}
</script>

<style scoped>
.f-header {
  z-index: 100;
  @apply flex items-center bg-purple-500 text-white fixed top-0 left-0 right-0;
  height: 64px;
}

.logo {
  width: 250px;
  @apply flex justify-center items-center text-xl font-bold ;
}

.icon-btn {
  @apply flex justify-center items-center w-[42px] h-[42px] cursor-pointer rounded-lg;
}

.icon-btn:hover {
  @apply bg-purple-600;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}
</style>
