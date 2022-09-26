<template>
  <el-upload
      drag
      :action="UPLOAD_IMAGE_ACTION"
      multiple
      :headers="{token}"
      name="img"
      :data="data"
      :on-success="uploadSuccess"
      :on-error="uploadError"
  >
    <el-icon class="el-icon--upload">
      <upload-filled/>
    </el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<script setup>
import {UploadFilled} from '@element-plus/icons-vue'
import {UPLOAD_IMAGE_ACTION} from "../api/image.js";
import {getToken} from "../util/auth.js";
import {toast} from "../util/uril.js";

const token = getToken()

defineProps({
  data: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['success'])
const uploadSuccess = (response, uploadFile, uploadFiles) => {
  console.log(response)
  emits('success', {response, uploadFile, uploadFiles})
}
const uploadError = (error, uploadFile, uploadFiles) => {
  let msg = JSON.parse(error.message).msg || '上传失败';
  toast(msg, 'error', 'error')
}
</script>

<style scoped>

</style>