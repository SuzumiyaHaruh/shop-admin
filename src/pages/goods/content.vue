<template>
  <form-drawer title="设置商品详情" @submit="submit" destroy-on-close ref="formDrawerRef">
    <el-form :model="form">
      <el-form-item>
        <editor v-model="form.content"/>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<script setup>
import {reactive, ref} from "vue";
import ChooseImage from "../../components/ChooseImage.vue";
import {readGoods, setGoodsBanner, updateGoods} from "../../api/goods.js";
import {toast} from "../../util/uril.js";
import FormDrawer from "../../components/FormDrawer.vue";
import Editor from "../../components/Editor.vue";

const formDrawerRef = ref(null)
const goodsId = ref(0)
const form = reactive({
  content: ''
})

/**
 * 打开弹框并获取数据
 */
const open = (row) => {
  goodsId.value = row.id
  readGoods(goodsId.value).then((res) => {
    form.content = res.content
    formDrawerRef.value.open()
  })
}
/**
 * 提交事件
 */
const emit = defineEmits(['reloadData'])
const submit = () => {
  formDrawerRef.value.showLoading()
  updateGoods(goodsId.value, form)
      .then((res) => {
        toast('设置商品详情成功', 'success', 'success')
        formDrawerRef.value.close()
        emit('reloadData')
      }).finally(() => {
    formDrawerRef.value.hideLoading()
  })
}
defineExpose({
  open
})
</script>

<style scoped>

</style>