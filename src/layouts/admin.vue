<template>
  <el-container>
    <el-header>
      <f-header/>
    </el-header>
    <el-container>
      <el-aside :width="$store.getters.asideWidth">
        <f-menu class="el-aside"></f-menu>
      </el-aside>
      <el-main>
        <f-tag-list/>
        <router-view v-slot="{Component}">
          <transition name="fade">
            <!--          页面缓存-->
            <keep-alive :max="10">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import FHeader from "./components/FHeader.vue";
import FMenu from "./components/FMenu.vue";
import FTagList from "./components/FTagList.vue";
</script>

<style scoped>
.el-aside {
  transition: all 0.4s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-active {
  transition-delay: 0.3s;
}

</style>