<script setup lang="ts">
import UiButton from "./ui/UiButton.vue";
</script>

<template>
    <div class="d-min-h-screen bg-gradient-to-br d-from-blue-500 to-purple-600 flex items-center justify-center">
      <UiButton>Кнопка</UiButton>
      <UiButton type="secondary">Кнопка</UiButton>
      <UiButton type="primary">Кнопка</UiButton>
    </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
