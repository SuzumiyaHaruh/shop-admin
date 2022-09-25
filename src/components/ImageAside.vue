<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
    <div class="top">
      <AsideList @delete="handleDelete(item.id)" @edit="handleEdit(item)" @click="activeId=item.id"
                 :active="activeId === item.id"
                 v-for="(item,index) in list" :key="index">
        {{ item.name }}
      </AsideList>

    </div>
    <div class="bottom">
      <el-pagination background layout="prev, next" :total="total" :current-page="currentPage" :page-size="limit"
                     @current-change="getData"/>
    </div>
  </el-aside>
  <form-drawer size="35%" :title="title" ref="formDrawerRef" @submit="handleSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input-number v-model="form.order" :min="0" :max="1000"/>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>
<script setup>
import {computed, reactive, ref} from "vue";

import AsideList from './AsideList.vue';
import {createImageClass, deleteImageClass, getImageClassList, updateImageClass} from "../api/image_class.js";
import FormDrawer from "./FormDrawer.vue";
import {showModal, toast} from "../util/uril.js";
import {getLogout} from "../api/manager.js";

const title = computed(() => editId.value ? "修改" : "新增")
//表单数据
const form = reactive({
  name: '',
  order: 50
})
const rules = {
  name: [{
    required: true,
    message: '图库分类名称不能为空',
    trigger: 'blur'
  }]
}
const formRef = ref(null)
// 加载动画
const loading = ref(false)
const list = ref([])
const activeId = ref(0)

// 分页
const currentPage = ref(1)
//总条数
const total = ref(0)
//每页多少条
const limit = ref(10)
const editId = ref(0)
const formDrawerRef = ref(null)
const handleCreate = () => {
  editId.value = 0
  form.name = ''
  form.order = 50
  formDrawerRef.value.open()
}
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    formDrawerRef.value.showLoading()
    const fun = editId.value ? updateImageClass(editId.value, form) : createImageClass(form)
    fun.then(res => {
      toast(title.value + '成功', 'success', 'success')
      getData(editId.value ? currentPage.value : 1)
      formDrawerRef.value.close()
    }).finally(() => {
      formDrawerRef.value.hideLoading()
    })
  })
}
// 获取数据
const getData = (p = null) => {
  if (typeof p == "number") {
    currentPage.value = p
  }

  loading.value = true
  getImageClassList(currentPage.value)
      .then(res => {
        total.value = res.totalCount
        list.value = res.list
        let item = list.value[0]
        if (item) {
          activeId.value = item.id
        }
      })
      .finally(() => {
        loading.value = false
      })
}

getData()

/**
 * 编辑
 */
const handleEdit = (item) => {
  editId.value = item.id
  form.name = item.name
  form.order = item.order
  formDrawerRef.value.open()

}
/**
 * 删除
 */
const handleDelete = (id) => {
  showModal('是否删除当前图库分类', 'warning', '提示')
      .then(() => {
        deleteImageClass(id)
            .then(res => {
              console.log(res)
              toast('删除成功', 'success', 'success')
              getData()
            })
      })
}
defineExpose({
  handleCreate
})

</script>
<style>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}

.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}

</style>