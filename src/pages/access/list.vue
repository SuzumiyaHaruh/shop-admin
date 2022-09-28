<template>
  <el-card shadow="never" class="border-0">
    <list-header @create="handleCreate" @refresh="getData"/>
    <el-tree :data="tableData" :props="{ label:'name',children:'child' }" v-loading="loading" node-key="id"
             :default-expanded-keys="defaultExpandedKeys">
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <el-tag size="small" :type="data.menu ? '' : 'info'">{{ data.menu ? "菜单" : "权限" }}</el-tag>
          <el-icon v-if="data.icon" :size="16" class="ml-2">
            <component :is="data.icon"/>
          </el-icon>
          <span>{{ data.name }}</span>
          <span class="custom-sw">
            <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0"
                       @change="handleStatusChange($event,data)"
            />
            <el-button text type="primary" @click.stop="handleEdit(data)" size="small">修改</el-button>
            <el-button @click.stop="addChild(data.id)" text type="primary" size="small">增加</el-button>
            <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消"
                           @confirm="handleDelete(data.id)">
                            <template #reference>
                                <el-button text type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
          </span>

        </span>
      </template>
    </el-tree>
  </el-card>
  <form-drawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
      <el-form-item label="上级菜单" prop="rule_id">
        <el-cascader v-model="form.rule_id"
                     :options="options"
                     :props="{ label:'name',children:'child',checkStrictly:true,emitPath:false }"
                     placeholder="请选择上级菜单"/>
      </el-form-item>
      <el-form-item label="菜单/规则" prop="menu">
        <el-input v-model="form.menu"></el-input>
      </el-form-item>
      <el-form-item label="菜单/权限名称" prop="name">
        <el-input v-model="form.rule_id"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon">
        <IconSelect v-model="form.icon"/>
      </el-form-item>
      <el-form-item label="前端路由" prop="frontpath">
        <el-input v-model="form.frontpath"></el-input>
      </el-form-item>
      <el-form-item label="后端规则" prop="condition">
        <el-input v-model="form.condition"></el-input>
      </el-form-item>
      <el-form-item label="请求方式" prop="method">
        <el-select v-model="form.method" class="m-2" placeholder="请选择请求方式">
          <el-option
              v-for="item in ['GET','POST','PUT','DELETE']"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input v-model="form.order"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="rule_id">
        <el-input v-model="form.rule_id"></el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>
<script setup>
import {ref} from "vue"
import {useInitForm, useInitTable} from "../../util/useCommon.js";
import {createRule, deleteRule, getRuleList, updateRule, updateRuleStatus} from "../../api/rule.js";
import ListHeader from "../../components/ListHeader.vue";
import FormDrawer from "../../components/FormDrawer.vue";
import {deleteNotice} from "../../api/notice.js";
import IconSelect from "../../components/IconSelect.vue";

const defaultExpandedKeys = ref([])
const options = ref([])
const {
  loading,
  tableData,
  getData,
  handleDelete,
  handleStatusChange
} = useInitTable({
  getList: getRuleList,
  delete: deleteRule,
  updateStatus: updateRuleStatus,
  onGetListSuccess: (res) => {
    options.value = res.rules
    tableData.value = res.list
    defaultExpandedKeys.value = res.list.map(o => o.id)
  }
})

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit
} = useInitForm({
  form: {
    rule_id: 0,
    menu: 0,
    name: "",
    condition: "",
    method: "GET",
    status: 1,
    order: 50,
    icon: "",
    frontpath: ""
  },
  rules: {},
  getData,
  update: updateRule,
  create: createRule
})
// 添加子分类
const addChild = (id) => {
  handleCreate()
  form.rule_id = id
  form.status = 1
}
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.custom-sw {
  position: absolute;
  /*margin-left: auto;*/
  right: 0;
}

.el-tree-node__content {
  padding: 20px 0;
}

.el-button.is-text {
  color: #c084fc;
}
</style>