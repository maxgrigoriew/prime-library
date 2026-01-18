<script lang="ts" setup>

defineOptions({
  name: 'LoginLayout'
})

</script>

<template>
  <div class="flex">
    <div class="h-100vh flex-grow flex flex-col bg-gray-200 h-screen">
    </div>

    <div class="w-[400px] py-52 flex flex-col">
      <slot />
    </div>
  </div>
</template>