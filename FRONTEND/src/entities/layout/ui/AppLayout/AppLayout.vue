<script setup lang="ts">

import {computed} from "vue";
import LoginLayout from "./LoginLayout/LoginLayout.vue";
import MainLayout from "./MainLayout/MainLayout.vue";
import {useRoute} from "vue-router";

defineOptions({
  name: 'AppLayout',
  components: {
    LoginLayout,
    MainLayout
  }
})

const route = useRoute()

const currentLayout = computed(() => `${route?.meta?.layout}Layout`)

</script>

<template>
  <component :is="currentLayout">
    <router-view />
  </component>
</template>

<style scoped>

</style>