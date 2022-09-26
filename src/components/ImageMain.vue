<template>
  <el-main class="image-main" v-loading="loading">
    <div class="top p-3">
      <el-row :gutter="10">
        <el-col v-for="(item,index) in list" :key="index" :span="6">
          <el-card shadow="hover" class="relative  mb-3" :body-style="{'padding':0}">
            <el-image :preview-src-list="[item.url]" :initial-index="0" :src="item.url" fit="cover"
                      class="w-full h-[150px]"></el-image>
            <div class="image-title">{{ item.name }}</div>
            <div class="flex items-center justify-center p-2">
              <el-button @click="handleRename(item)" type="primary" size="small" text>重命名</el-button>
              <el-button @click="onDelete(item)" type="primary" size="small" text>删除</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-pagination
          layout="prev,pager, next"
          :total="total"
          :current-page="currentPage"
          :page-size="limit"
          @current-change="getData"/>
    </div>
  </el-main>
  <!--  上传图片-->
  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <upload-file :data="{image_class_id}" @success="handleUpSuccess"></upload-file>
  </el-drawer>
</template>

<script setup>
import {defineEmits, ref} from "vue"
import {deleteImage, getImageList, updateImage} from "../api/image.js";
import {showModal, showPrompt, toast} from "../util/uril.js";
import UploadFile from "./UploadFile.vue";
// 分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
const list = ref([])
const loading = ref(false)
const image_class_id = ref(0)
const drawer = ref(false)
const getData = (p = null) => {
  if (typeof p == "number") {
    currentPage.value = p
  }
  loading.value = true
  getImageList(image_class_id.value, currentPage.value)
      .then(res => {
        total.value = res.totalCount
        list.value = res.list
      })
      .finally(() => {
        loading.value = false
      })
}
/**
 * 根据分类id重新加载分类列表
 */

const loadData = (id) => {
  currentPage.value = 1
  image_class_id.value = id
  getData()
}
/**
 * 重命名
 */
const handleRename = (item) => {
  showPrompt('重命名', '', item.name).then(newName => {
    loading.value = true
    updateImage(item.id, newName.value)
        .then(res => {
          toast('重命名成功', 'success', 'success')
          getData()
        })
        .finally(() => {
          loading.value = false
        })
  })
}
/**
 * 删除
 */
const onDelete = (item) => {
  showModal('是否删除图片', 'warning', '警告').then(() => {
    loading.value = true
    deleteImage([item.id]).then(res => {
      toast('删除成功', 'success', 'success')
      getData()
    }).finally(() => {
      loading.value = false
    })
  })
}
/**
 * 上传图片交互事件
 */
const ImageOpen = () => {
  drawer.value = true
}
/**
 * 上传成功
 */
const handleUpSuccess = () => {
  toast('上传成功', 'success', 'success')
  drawer.value = false
  getData()
}
defineExpose({
  loadData,
  ImageOpen
})
</script>

<style scoped>
.image-main {
  position: relative;
}

.image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}

.image-title {
  position: absolute;
  top: 122px;
  left: -1px;
  right: -1px;
  @apply text-sm text-center truncate text-gray-100 bg-opacity-50 bg-zinc-900 p-1
}

.el-button.is-text {
  @apply text-purple-400
}

</style>