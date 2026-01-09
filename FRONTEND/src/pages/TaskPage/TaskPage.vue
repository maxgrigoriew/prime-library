<script setup lang="ts">

import UiButton from "@/ui/UiButton/UiButton.vue";
import UiTestTooltip from "@/ui/UiTestTooltip/UiTestTooltip.vue";
</script>

<template>
   <UiTestTooltip>
     <template #trigger>
       <UiButton>Наведи на меня</UiButton>
     </template>
   </UiTestTooltip>
</template>

<style scoped>

</style>