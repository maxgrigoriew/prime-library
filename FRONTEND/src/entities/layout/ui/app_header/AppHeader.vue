<script setup lang="ts">

defineOptions({
  name: 'AppHeader'
})
</script>

<template>
  <div class="flex flex-col justify-between p-4">
    <div class="header_top">
      <ul class="flex flex-col justify-center items-center gap-12">
        <li>
          <router-link to="/" class="text-white h-20">Главная</router-link>
        </li>
        <li>
          <router-link to="tasks" class="text-white h-20">Задачи</router-link>
        </li>
      </ul>
    </div>

    <div class="header_bottom">bottom</div>
  </div>
</template>

<style scoped>

</style>