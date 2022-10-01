<template>
  <el-card shadow="hover" class="border-0">
    <!-- 新增|刷新 -->
    <list-header @delete="handleMutiDelete" layout="create,delete,refresh" @create="handleCreate" @refresh="getData"/>
    <el-table
        ref="multipleTableRef"
        :data="tableData" stripe style="width: 100%" v-loading="loading"
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="name" label="规格名称"/>
      <el-table-column prop="default" label="规格值" width="380"/>
      <el-table-column prop="order" label="排序"/>
      <!--      状态-->
      <el-table-column label="状态" width="120">
        <template #default="{row}">
          <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0"
                     :loading="row.statusLoading" :disabled="row.super === 1"
                     @change="handleStatusChange($event,row)"/>
        </template>
      </el-table-column>
      <!--      操作-->
      <el-table-column label="操作" width="250" align="center">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row,scope.row.id)" type="primary" size="small" text>修改</el-button>

          <el-popconfirm title="是否要删除该规格？" confirmButtonText="确认" cancelButtonText="取消"
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
  <FormDrawer :destroyOnClose="true" ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
      <el-form-item label="规格名称" prop="name">
        <el-input v-model="form.name" placeholder="规格名称"></el-input>
      </el-form-item>
      <el-form-item label="配许" prop="order">
        <el-input-number v-model="form.order" :min="0" :max="1000">
        </el-input-number>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item label="规格值" prop="default">
        <!--        <el-input v-model="form.default" placeholder="规格值"></el-input>-->
        <tag-input v-model="form.default"/>
      </el-form-item>
    </el-form>
  </FormDrawer>
  <!--  权限配置-->
</template>
<script setup>
import FormDrawer from "../../components/FormDrawer.vue";

//分页
import {useInitForm, useInitTable} from "../../util/useCommon.js";

import ListHeader from "../../components/ListHeader.vue";
import {createRole, deleteRole, getRoleList, setRoleRules, updateRole, updateRoleStatus} from "../../api/role.js";
import {createSkus, deleteSkus, getSkusList, updateSkus, updateSkusStatus} from "../../api/skus.js";
import TagInput from "../../components/TagInput.vue";
import {ref} from "vue";
import {toast} from "../../util/uril.js";
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
  handleDelete,
  handleStatusChange,
  handleSelectionChange,
  handleMutiDelete,
  multipleTableRef
} = useInitTable({
  getList: getSkusList,
  delete: deleteSkus,
  updateStatus: updateSkusStatus
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
    name: "",
    status: 1,
    default: "",
    order: 50
  },
  rules: {
    name: [{
      required: true,
      message: '规格名称不能为空',
      trigger: 'blur'
    }],
    default: [{
      required: true,
      message: '规格值不能为空',
      trigger: 'blur'
    }],
  },
  getData,
  update: updateSkus,
  create: createSkus
})

</script>
<style scoped>
.el-button.is-text {
  color: #c084fc;
}

.el-tree-node__content {
  padding: 20px 0;
}
</style>