<template>
  <el-drawer
      v-model="showDrawer" :title="title" :destroy-on-close="destroyOnClose" :size="size"
      :close-on-click-modal="false">
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button type="primary" @click="submit" color="#9f4eea" :loading="loading">{{ confirmText }}</el-button>
        <el-button type="info" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
import {ref} from "vue"

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "45%"
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: "提交"
  }
})
const loading = ref(false)
const showLoading = () => loading.value = true
const hideLoading = () => loading.value = false

const showDrawer = ref(false)
/**
 * 提交事件
 */
const emit = defineEmits(['submit'])
const submit = () => {
  emit('submit')
}
// 打开
const open = () => showDrawer.value = true

// 关闭
const close = () => showDrawer.value = false
// 向父组件暴露以下方法
defineExpose({
  open,
  close,
  showLoading,
  hideLoading
})

</script>
<style>
.formDrawer {
  @apply flex flex-col w-full h-full relative;
}

.formDrawer .body {
  @apply flex-1 absolute top-0 left-0 right-0 bottom-[50px] overflow-y-auto
}

.formDrawer .actions {
  @apply mt-auto flex items-center h-[50px];
}
</style>