<script setup lang="ts">

import AppHeader from "../../AppHeader/AppHeader.vue";
</script>

<template>
  <div>
    <app-header />
    <div class="ml-[80px] p-20">
      <slot />
    </div>
  </div>
</template>

<style scoped>

</style>