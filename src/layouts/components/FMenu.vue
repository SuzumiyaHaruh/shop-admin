<template>
  <div class="f-menu">
    <el-menu
        :unique-opened="true"
        :collapse="isCollapse"
        class="f-el-menu"
        :default-active="defaultActive"
        :collapse-transition="false"
        @select="handleSelect"
        :style="{ width:$store.getters.asideWidth }"
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
import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import {useStore} from "vuex";

const store = useStore()
const router = useRouter()
const route = useRoute()
const asideMenus = store.getters.menus
//默认路由
const defaultActive = ref(route.path)
/**
 * 是否折叠
 * @type {ComputedRef<boolean>}
 */
const isCollapse = computed(() => !(store.getters.asideWidth === '250px'))
/**
 * 路由跳转
 * @param e
 */

const handleSelect = (e) => {
  router.push(e)
}
</script>

<style>
.f-menu {
  transition: all 0.2s;
  @apply shadow-lg bg-white fixed top-[64px] bottom-0 left-0 overflow-y-auto overflow-x-hidden border-0
}

.f-menu::-webkit-scrollbar {
  width: 0;
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

:root {
  --el-menu-active-color: #c084fc
}
</style>