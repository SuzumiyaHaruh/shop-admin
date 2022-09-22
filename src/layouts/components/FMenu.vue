<template>
  <div class="f-menu">
    <el-menu
        default-active="2"
        class="f-el-menu"
        @select="handleSelect"
    >
      <template v-for="(item,index)  in asideMenus" :key="index">
        <!--      二级菜单-->
        <el-sub-menu v-if="item.child&&item.child.length" :index="item.name">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="itemChild in item.child" :index="itemChild.frontpath">
            <el-icon>
              <component :is="itemChild.icon"></component>
            </el-icon>
            <span>{{ itemChild.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <!--        一级菜单-->
        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router  =useRouter()
const asideMenus = [{
  "name": "后台面板",
  "icon": "help",
  "child": [{
    "name": "主控台",
    "icon": "home-filled",
    "frontpath": "/",
  }]
}, {
  "name": "商城管理",
  "icon": "shopping-bag",
  "child": [{
    "name": "商品管理",
    "icon": "shopping-cart-full",
    "frontpath": "/goods/list",
  }]
}]
const handleSelect=(e)=>{
  router.push(e)
}
</script>

<style>
.f-menu {
  @apply w-[250px] shadow-lg fixed top-[64px] bottom-0 left-0 overflow-auto border-0
}

.f-menu .f-el-menu {
  @apply border-0
}

.el-sub-menu__title {
  @apply hover:bg-purple-100
}

.el-menu-item {
  @apply hover:bg-purple-100
}

.el-menu-item.is-active {
  @apply text-purple-400
}
</style>