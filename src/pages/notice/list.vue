<template>
  <el-card shadow="hover" class="border-0">
    <!-- 新增|刷新 -->
    <div class="flex items-center justify-between mb-4">
      <el-button color="#9f4eea" type="primary" size="small" @click="handleCreate">新增</el-button>
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-button @click="getData" text>
          <el-icon :size="20">
            <Refresh/>
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="公告标题"/>
      <el-table-column prop="create_time" label="发布时间" width="380"/>
      <el-table-column label="操作" width="180" align="center">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row,scope.row.id)" type="primary" size="small" text>修改</el-button>

          <el-popconfirm title="是否要删除该公告？" confirmButtonText="确认" cancelButtonText="取消"
                         @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button text type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="flex items-center justify-center mt-5">
      <el-pagination layout="prev, pager ,next" :total="total" :current-page="currentPage" :page-size="limit"
                     @current-change="getData"/>
    </div>

  </el-card>
  <!--  抽屉-->
  <form-drawer ref="formDrawerRef" title="新增" @submit="handleSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="form.title" placeholder="公告标题"></el-input>
      </el-form-item>
      <el-form-item label="公告内容" prop="content">
        <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>
<script setup>
import {computed, reactive, ref} from "vue"
import {createNotice, deleteNotice, getNoticeList, updateNotice} from "../../api/notice.js";
import FormDrawer from "../../components/FormDrawer.vue";
import {createImageClass, updateImageClass} from "../../api/image_class.js";
import {toast} from "../../util/uril.js";

const tableData = ref([])
const loading = ref(false)
// 分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
//是否编辑状态
const editId = ref(0)
// 表单部分
const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
  title: "",
  content: ""
})
const rules = {
  title: [{
    required: true,
    message: '公告标题不能为空',
    trigger: 'blur'
  }],
  content: [{
    required: true,
    message: '公告内容不能为空',
    trigger: 'blur'
  }]
}
const title = computed(() => editId.value ? "修改" : "新增")
const getData = (p = null) => {
  if (typeof p === "number") {
    currentPage.value = p
  }
  loading.value = true
  getNoticeList(currentPage.value)
      .then(res => {
        console.log(res)
        tableData.value = res.list
        total.value = res.totalCount
      })
      .finally(() => loading.value = false)
}
getData()

/**
 * 删除
 * @param id
 */
const handleDelete = (id) => {
  deleteNotice(id)
      .then(res => {
        toast('删除成功', 'success', 'success')
        getData(1)
      })
}
/**
 * 新增
 */
const handleCreate = () => {
  editId.value = 0
  form.content = ''
  form.title = ''
  formDrawerRef.value.open()
}
/**
 * 编辑
 */
const handleEdit = (item, id) => {
  editId.value = id
  form.content = item.content
  form.title = item.title
  formDrawerRef.value.open()
}
/**
 * 提交事件
 */
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return
    formDrawerRef.value.showLoading()
    const fun = editId.value ? updateNotice(editId.value, form) : createNotice(form)
    fun.then(res => {
      toast(title.value + '成功', 'success', 'success')
      // 修改刷新当前页，新增刷新第一页
      getData(editId.value ? false : 1)
      formDrawerRef.value.close()
    }).finally(() => {
      formDrawerRef.value.hideLoading()
    })
  })
}
</script>
<style scoped>
.el-button.is-text {
  color: #c084fc;
}
</style>