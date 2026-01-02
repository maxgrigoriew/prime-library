<script setup lang="ts">

import AppHeader from "../../app_header/AppHeader.vue";
</script>

<template>
  <div class="flex d-gap-3 bg-red-200">
    <app-header class="fixed left-12 top-12 bottom-12 w-[60px] bg-blue-4"/>
    <div class="ml-16">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>