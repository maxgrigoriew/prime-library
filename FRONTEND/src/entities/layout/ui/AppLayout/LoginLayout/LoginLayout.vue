<script lang="ts" setup>

import UiAlert from "@/ui/UiAlert/UiAlert.vue";
import UiButton from "@/ui/UiButton/UiButton.vue";

defineOptions({
  name: 'LoginLayout'
})

type Props = {}

const {} = defineProps<Props>()


</script>

<template>
  <div class="flex">
    <div class="weicome h-100vh flex-grow flex flex-col bg-grey-2 h-screen">

    </div>
    <div class="sidebar w-[400px] py-32">
      <div class="h-1 bg-grey-2"></div>
      <div>
        <div class="px-32 text-2xl font-bold ">Вход на сайт</div>
        <UiAlert type="secondary">
          test
        </UiAlert>

        <UiButton type="secondary">sdf</UiButton>
      </div>
      <div class="h-1 bg-grey-2"></div>
      <div>Вход</div>
    </div>
  </div>
</template>

<style scoped>

</style>