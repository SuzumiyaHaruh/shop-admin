<template>
  <el-container class="bg-white shadow rounded" :style="{ height: (h + 'px') }">
    <el-header class="image-header">
      <el-button type="primary" color="#9f4eea"  size="small" @click="handleOpenCreate">新增图片分类</el-button>
    </el-header>
    <el-container>
      <!--侧边-->
      <image-aside ref="ImagAside"/>
      <!--    主体-->
      <image-main/>
    </el-container>
  </el-container>
</template>
<script setup>

import ImageAside from "../../components/ImageAside.vue";
import ImageMain from "../../components/ImageMain.vue";
import {ref} from "vue";

const ImagAside = ref(null)
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 44 - 40
/**
 * 打开侧边栏
 */
const handleOpenCreate=()=>{
  ImagAside.value.handleCreate()
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