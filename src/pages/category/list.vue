<template>
  <el-card shadow="never" class="border-0">
    <list-header @create="handleCreate" @refresh="getData"/>
    <el-tree :data="tableData" :props="{ label:'name',children:'child' }" v-loading="loading" node-key="id"
             :default-expanded-keys="defaultExpandedKeys">
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ data.name }}</span>
          <span class="custom-sw">
            <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0"
                       @change="handleStatusChange($event,data)"
            />
            <el-button :loading="data.goodsDrawerLoading" text type="primary" size="small" @click="openGoodsDrawer(data)">推荐商品</el-button>
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
  <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" placeholder="分类名称"></el-input>
      </el-form-item>
    </el-form>
  </FormDrawer>
  <goods-drawer ref="GoodsDrawerRef"/>

</template>
<script setup>
import {ref} from "vue"
import {useInitForm, useInitTable} from "../../util/useCommon.js";
import {createRule, deleteRule, getRuleList, updateRule, updateRuleStatus} from "../../api/rule.js";
import ListHeader from "../../components/ListHeader.vue";
import FormDrawer from "../../components/FormDrawer.vue";
import {deleteNotice} from "../../api/notice.js";
import IconSelect from "../../components/IconSelect.vue";
import {
  createCategory,
  deleteCategory,
  getCategoryList,
  updateCategory,
  updateCategoryStatus
} from "../../api/category.js";
import GoodsDrawer from "./components/GoodsDrawer.vue";

const options = ref([])
const {
  loading,
  tableData,
  getData,
  handleDelete,
  handleStatusChange
} = useInitTable({
  getList: getCategoryList,
  onGetListSuccess: (res) => {
    tableData.value = res.map(o => {
      o.goodsDrawerLoading = false;
      return o;
    })
  },
  delete: deleteCategory,
  updateStatus: updateCategoryStatus
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
    name: "",
  },
  rules: {},
  getData,
  update: updateCategory,
  create: createCategory
})
// 添加子分类
const addChild = (id) => {
  handleCreate()
  form.rule_id = id
  form.status = 1
}

const GoodsDrawerRef = ref(null)
const openGoodsDrawer = (data) => GoodsDrawerRef.value.open(data)
</script>
<style scoped>
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