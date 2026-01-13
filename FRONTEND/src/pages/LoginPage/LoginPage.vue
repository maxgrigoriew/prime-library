<script lang="ts" setup>

import UiAlert from "@/ui/UiAlert/UiAlert.vue";
import UiInput from "@/ui/UiInput/UiInput.vue";
import UiButton from "@/ui/UiButton/UiButton.vue";
import {authFt} from "@/entities/auth/features/authFf.ts";
import {UiDropdown} from "@/ui";

defineOptions({
  name: 'LoginPage'
})

const {userLogin, userPassword ,loadMyProfile} = authFt()
const options = [
  {
    label: 'one',
    value: 1,
  },
  {
    label: 'two',
    value: 2,
  }
]
</script>

<template>
  <div class="h-1 bg-gray-2"></div>
  <div>
  <UiDropdown :options="options"/>

  </div>
  <div class="px-12 m-auto flex flex-col gap-20">
    <div class="px-32 text-2xl font-bold ">Вход на сайт</div>
    <UiAlert type="secondary">
      Продолжить вход с данными этой учетной записи
    </UiAlert>
    {{userLogin}}
    <UiInput title="Логин" v-model="userLogin" />

    <UiInput title="Пароль" :visible="false" v-model="userPassword" />
    <UiButton type="primary" class="ml-auto w-100%" @click="loadMyProfile">Войти</UiButton>
  </div>
  <div class="h-1 bg-gray-2 mt-auto"></div>
</template>

<style scoped>

</style>