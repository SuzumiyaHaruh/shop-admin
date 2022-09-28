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
//分页
import {useInitForm, useInitTable} from "../../util/useCommon.js";
import {createManager, updateManager} from "../../api/manager.js";
//搜索和列表分页
const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete
} = useInitTable({
  getList: getNoticeList,
  delete: deleteNotice
})

//新增修改
const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  resetForm,
  handleCreate,
  handleEdit
} = useInitForm({
  form: {
    title: "",
    content: ""
  },
  rules: {
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
  },
  getData,
  update: updateNotice,
  create: createNotice
})

</script>
<style scoped>
.el-button.is-text {
  color: #c084fc;
}
</style>