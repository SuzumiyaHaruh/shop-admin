<template>
  <el-container class="bg-white shadow rounded" :style="{ height: (h + 'px') }">、
    <el-header class="image-header">
      <!--    新增图片-->
      <el-button type="warning" plain  size="small" @click="handleOpenCreate">新增图片分类</el-button>
      <!--    上传图片-->
      <el-button type="success" plain size="small" @click="handleOpenUpload">上传图片</el-button>
    </el-header>
    <el-container>
      <!--侧边-->
      <image-aside ref="ImagAside" @change="handleAsideChange"/>
      <!--    主体-->
      <image-main ref="ImageMainRef"/>
    </el-container>
  </el-container>
</template>
<script setup>

import ImageAside from "../../components/ImageAside.vue";
import ImageMain from "../../components/ImageMain.vue";
import {ref} from "vue";

const ImageMainRef = ref(null)
const ImagAside = ref(null)
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 44 - 40
/**
 * 打开侧边栏
 */
const handleOpenCreate = () => {
  ImagAside.value.handleCreate()
}
/**
 * 打开上传图片侧边栏
 */
const handleOpenUpload = () => {
  ImageMainRef.value.ImageOpen()
}
/**
 *处理子传的id
 */
const handleAsideChange = (image_classId) => {
  ImageMainRef.value.loadData(image_classId)
}
</script>
<style>
.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}

.image-aside .top, .image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-aside .bottom, .image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>