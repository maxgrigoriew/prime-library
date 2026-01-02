<script setup lang="ts">

import {computed} from "vue";
import MainLayout from "../app_layout/main_layout/MainLayout.vue";
import {AppLayout} from "../types.ts";

defineOptions({
  name: 'AppLayout',
  components: {
    MainLayout
  }
})

const currentLayout = computed(() => AppLayout.Main + 'Layout')

</script>

<template>
  <component :is="currentLayout">
    <router-view />
  </component>
</template>

<style scoped>

</style>