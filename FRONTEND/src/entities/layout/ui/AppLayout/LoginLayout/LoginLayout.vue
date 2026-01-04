<script lang="ts" setup>

import UiAlert from "@/ui/UiAlert/UiAlert.vue";
import UiButton from "@/ui/UiButton/UiButton.vue";
import UiInput from "@/ui/UiInput/UiInput.vue";
import {ref} from "vue";

defineOptions({
  name: 'LoginLayout'
})

type Props = {}

const {} = defineProps<Props>()


const input = ref('')

</script>

<template>
  <div class="flex">
    <div class="h-100vh flex-grow flex flex-col bg-grey-2 h-screen">

    </div>
    <div class="w-[400px] py-52 flex flex-col">
      <div class="h-1 bg-grey-2"></div>
      <div class="px-12 m-auto flex flex-col gap-20">
        <div class="px-32 text-2xl font-bold ">Вход на сайт</div>
        <UiAlert type="secondary">
          Продолжить вход с данными этой учетной записи
        </UiAlert>
        <UiInput title="Логин" v-model="input" />

        <UiInput title="Пароль" v-model="input" />

        <UiButton type="secondary" class="ml-auto w-100%">Войти</UiButton>
      </div>
      <div class="h-1 bg-grey-2 mt-auto"></div>
    </div>
  </div>
</template>

<style scoped>

</style>