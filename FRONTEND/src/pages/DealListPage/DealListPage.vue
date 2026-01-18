<script setup lang="ts">

import {UiButton, UiInput} from "@/ui";

defineOptions({
  name: 'DealListPage'
})

</script>

<template>
  <div class="flex gap-12 flex-col">
    <div class="flex items-center justify-between font-medium gap-12">
      <div class="text-2xl">Список сделок</div>
      <UiButton>Моздать сделку</UiButton>
    </div>

    <div class="flex gap-12">
      <UiInput class="w-50%" placeholder="Поиск по организации"/>
      <UiInput class="w-50%" placeholder="Поиск по сделке"/>
    </div>

    <div>Список фильтров...</div>

  </div>
</template>

<style scoped>

</style>