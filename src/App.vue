<script setup>

</script>

<template>
  <router-view/>
</template>

<style>
#nprogress .bar {
  background: #7631b0 !important;
}

#nprogress .spinner .spinner-icon {
  display: none;
}

body {
  background-color: #f4f4f4 !important;
}

/*//滚动条样式*/
::-webkit-scrollbar {
  width: 4px;
  height: 6px;
}

::-webkit-scrollbar-corner {
  display: block;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(243, 232, 255);
}

::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track {
  border-right-color: transparent;
  border-left-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
