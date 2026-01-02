<script setup lang="ts">

import {computed} from "vue";
import MainLayout from "../app_layout/main_layout/MainLayout.vue";
import {AppLayoutType} from "..//types.ts";

defineOptions({
  name: 'AppLayout',
  components: {
    MainLayout
  }
})

const currentLayout = computed(() => AppLayoutType.MainLayout)

</script>

<template>
  <component :is="currentLayout" />
</template>

<style scoped>

</style>