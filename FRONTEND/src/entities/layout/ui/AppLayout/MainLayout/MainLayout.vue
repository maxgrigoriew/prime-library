<script setup lang="ts">

import AppHeader from "../../AppHeader/AppHeader.vue";
</script>

<template>
  <div>
    <app-header />
    <div class="ml-[102px]">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>