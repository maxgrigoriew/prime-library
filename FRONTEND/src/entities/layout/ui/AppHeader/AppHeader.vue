<script setup lang="ts">

import AppHeaderLink from "./AppHeaderLink/AppHeaderLilnk.vue";

defineOptions({
  name: 'AppHeader'
})
</script>

<template>
  <div
      class="flex flex-col justify-between p-4 pt-12 rounded-[8px] fixed left-20 top-20 bottom-20 w-[60px] bg-gray-400">
    <div class="header_top">
      <ul class="flex flex-col justify-center items-center gap-12">
        <AppHeaderLink to="/">
          <i class="pi pi-home"></i>
        </AppHeaderLink>
        <AppHeaderLink to="/tasks">
          <i class="pi pi-inbox"></i>
        </AppHeaderLink>
        <AppHeaderLink to="/deals">
          <i class="pi pi-image"></i>
        </AppHeaderLink>
      </ul>
    </div>
  </div>
</template>
