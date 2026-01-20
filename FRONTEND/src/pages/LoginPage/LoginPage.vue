<script lang="ts" setup>

import UiAlert from "@/ui/UiAlert/UiAlert.vue";
import UiInput from "@/ui/UiInput/UiInput.vue";
import UiButton from "@/ui/UiButton/UiButton.vue";
import {authFt} from "@/entities/auth/features/authFf.ts";
import AuthPassword from "@/entities/auth/ui/AuthPassword.vue";

defineOptions({
  name: 'LoginPage'
})

const {userLogin, userPassword, loadMyProfile} = authFt()

</script>

<template>
  <div class="bg-gray-200"></div>
  <div class=" px-12 m-auto flex flex-col gap-20">
    <div class="px-32 text-2xl font-bold ">Вход на сайт</div>
    <UiAlert type="secondary">
      Продолжить вход с данными этой учетной записи
    </UiAlert>
    {{ userLogin }}
    <UiInput title="Логин" v-model="userLogin" @keydown.enter="loadMyProfile"/>

    <AuthPassword title="Пароль" v-model="userPassword" @keydown.enter="loadMyProfile"/>
    <UiButton type="primary" class="w-100%" @click="loadMyProfile">Войти</UiButton>
  </div>
  <div class="h-1 bg-gray-200 mt-auto"></div>
</template>

<style scoped>

</style>