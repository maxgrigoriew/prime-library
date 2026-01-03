<script setup lang="ts">

import AppHeader from "../../app_header/AppHeader.vue";
</script>

<template>
  <div class="flex d-gap-3">
    <app-header />
    <div class="ml-[102px] p-12">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>