<script lang="ts" setup>
import {authFt} from "@/entities/auth/features/authFf.ts";
import AuthPassword from "@/entities/auth/ui/AuthPassword.vue";
import UiAlert from "@/ui/UiAlert/UiAlert.vue";
import UiButton from "@/ui/UiButton/UiButton.vue";
import UiInput from "@/ui/UiInput/UiInput.vue";

defineOptions({
  name: 'LoginPage'
})

const {userLogin, userPassword, loadMyProfile} = authFt()

</script>

<template>
  <div class="bg-gray-200" />
  <div class=" px-12 m-auto flex flex-col gap-20">
    <div class="px-32 text-2xl font-bold ">
      Вход на сайт
    </div>
    <UiAlert type="secondary">
      Продолжить вход с данными этой учетной записи
    </UiAlert>
    {{ userLogin }}
    <UiInput
      v-model="userLogin"
      title="Логин"
      @keydown.enter="loadMyProfile"
    />

    <AuthPassword
      v-model="userPassword"
      title="Пароль"
      @keydown.enter="loadMyProfile"
    />
    <UiButton
      type="primary"
      class="w-100%"
      @click="loadMyProfile"
    >
      Войти
    </UiButton>
  </div>
  <div class="h-1 bg-gray-200 mt-auto" />
</template>

<style scoped>

</style>