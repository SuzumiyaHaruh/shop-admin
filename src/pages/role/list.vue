<template>
  <el-card shadow="hover" class="border-0">
    <!-- 新增|刷新 -->
    <list-header @create="handleCreate" @refresh="getData"/>

    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="角色名称"/>
      <el-table-column prop="desc" label="角色描述" width="380"/>
      <el-table-column label="操作" width="250" align="center">
        <template #default="scope">
          <el-switch :modelValue="scope.row.status" :active-value="1" :inactive-value="0"
                     :loading="scope.row.statusLoading" :disabled="scope.row.super === 1"
                     @change="handleStatusChange($event,scope.row)"/>
          <el-button type="primary" size="small" text @click="openSetRule(scope.row)">配置权限</el-button>
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
  <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="desc">
        <el-input v-model="form.desc" placeholder="角色描述" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
        </el-switch>
      </el-form-item>
    </el-form>
  </FormDrawer>
  <!--  权限配置-->
  <FormDrawer ref="setRuleFormDrawerRef" :title="drawerTitle" @submit="handleSetRuleSubmit">
    <el-tree-v2 node-key="id"
                ref="elTreeRef"
                :default-expanded-keys="defaultExpandedKeys" :data="ruleList" :props="{ label:'name',children:'child' }"
                @check="handleTreeCheck"
                show-checkbox :height="treeHeight">
      <template #default="{ node,data }">
        <div class="flex items-center">
          <el-tag size="small" :type="data.menu ? '' : 'info'">{{ data.menu ? "菜单" : "权限" }}</el-tag>
          <span class="ml-2 text-sm">{{ data.name }}</span>
        </div>
      </template>
    </el-tree-v2>
  </FormDrawer>
</template>
<script setup>
import {createNotice, deleteNotice, getNoticeList, updateNotice} from "../../api/notice.js";
import FormDrawer from "../../components/FormDrawer.vue";

//分页
import {useInitForm, useInitTable} from "../../util/useCommon.js";

import ListHeader from "../../components/ListHeader.vue";
import {createRole, deleteRole, getRoleList, setRoleRules, updateRole, updateRoleStatus} from "../../api/role.js";
import {ref} from "vue";
import {getRuleList} from "../../api/rule.js";
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
  handleStatusChange
} = useInitTable({
  getList: getRoleList,
  delete: deleteRole,
  updateStatus: updateRoleStatus
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
    desc: "",
    status: 1
  },
  rules: {
    name: [{
      required: true,
      message: '角色名称不能为空',
      trigger: 'blur'
    }],
  },
  getData,
  update: updateRole,
  create: createRole
})
/**
 * 权限配置事件
 */
const setRuleFormDrawerRef = ref(null)
const ruleList = ref([])
const treeHeight = ref(0)
const roleId = ref(0)
const defaultExpandedKeys = ref([])
const elTreeRef = ref(null)
// 当前角色拥有的权限ID
const ruleIds = ref([])

const openSetRule = (row) => {
  roleId.value = row.id
  treeHeight.value = window.innerHeight - 180
  getRuleList(1).then(res => {
    ruleList.value = res.list
    defaultExpandedKeys.value = res.list.map(o => o.id)
    setRuleFormDrawerRef.value.open()

    // 当前角色拥有的权限ID
    ruleIds.value = row.rules.map(o => o.id)
    setTimeout(() => {
      elTreeRef.value.setCheckedKeys(ruleIds.value)
    }, 150);
  })
}

const handleSetRuleSubmit = (id, rule_ids) => {
  setRuleFormDrawerRef.value.showLoading()
  setRoleRules(roleId.value, ruleIds.value)
      .then(res => {
        toast("配置成功")
        getData()
        setRuleFormDrawerRef.value.close()
      })
      .finally(() => {
        setRuleFormDrawerRef.value.hideLoading()
      })
}

const handleTreeCheck = (...e) => {
  const {checkedKeys, halfCheckedKeys} = e[1]
  ruleIds.value = [...checkedKeys, ...halfCheckedKeys]
}
</script>
<style scoped>
.el-button.is-text {
  color: #c084fc;
}

.el-tree-node__content {
  padding: 20px 0;
}
</style>