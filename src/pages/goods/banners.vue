<template>
  <el-drawer
      title="设置轮播图" v-model="dialogVisible" direction="rtl" size="30%"
      :destroy-on-close="true">
    <el-form :model="form" label-width="80px">
      <el-form-item label="轮播图">
        <choose-image :limit="9" v-model="form.banners"/>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import {reactive, ref} from "vue";
import ChooseImage from "../../components/ChooseImage.vue";
import {readGoods, setGoodsBanner} from "../../api/goods.js";
import {toast} from "../../util/uril.js";

const dialogVisible = ref(false)
const goodsId = ref(0)
const form = reactive({
  banners: []
})

/**
 * 打开弹框并获取数据
 */
const open = (row) => {
  goodsId.value = row.id
  readGoods(goodsId.value).then((res) => {
    form.banners = res.goodsBanner.map((row) => row.url)
    dialogVisible.value = true
  })
}
/**
 * 提交事件
 */
const emit = defineEmits(['reloadData'])
const loading = ref(false)
const submit = () => {
  loading.value = true
  setGoodsBanner(goodsId.value, form)
      .then((res) => {
        toast('设置轮播图成功', 'success', 'success')
        dialogVisible.value = false
        emit('reloadData')
      }).finally(() => {
        loading.value =false
  })
}
defineExpose({
  open
})
</script>

<style scoped>

</style>