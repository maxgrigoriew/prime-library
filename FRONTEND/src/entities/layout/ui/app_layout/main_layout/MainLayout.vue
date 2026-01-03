<script setup lang="ts">

import AppHeader from "../../app_header/AppHeader.vue";
</script>

<template>
  <div>
    <app-header />
    <div class="ml-[102px] p-12">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>