<template>
  <div>
    <el-select v-model="modelValue" class="m-2" placeholder="请选择图标" @change="handleChange">
      <el-option
          v-for="item in icons"
          :key="item"
          :label="item"
          :value="item"
      >
        <div class="flex items-center justify-between">
          <el-icon>
            <component :is="item"></component>
          </el-icon>
          <span class="text-gray-500">{{ item }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import {ref} from "vue";
import * as iconList from '@element-plus/icons-vue'

defineProps({
  modelValue: {
    type: String,
    required: true,
  }
})
const emit = defineEmits(["update:modelValue"])
const icons = ref(Object.keys(iconList))

const handleChange = (icon) => {
  //动态绑定
  emit('update:modelValue', icon)
}
</script>

<style scoped>

</style>