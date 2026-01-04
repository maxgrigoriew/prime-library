<script setup lang="ts">

import IconTasks from '@/assets/icons/tasks.svg?component';
import IconHome from '@/assets/icons/home.svg?component';
import IconDeals from '@/assets/icons/deals.svg?component';
import AppHeaderLink from "./AppHeaderLink/AppHeaderLilnk.vue";
import {logout} from "@/entities/auth/api/methods/logout.ts";
import UiButton from "@/ui/UiButton/UiButton.vue";

defineOptions({
  name: 'AppHeader'
})
</script>

<template>
  <div class="flex flex-col justify-between p-4 pt-12 rounded-[8px] fixed left-12 top-12 bottom-12 w-[70px] bg-blue-3">
    <div class="header_top">
      <ul class="flex flex-col justify-center items-center gap-12">
        <AppHeaderLink to="/">
          <IconHome />
        </AppHeaderLink>
        <AppHeaderLink to="/tasks">
          <IconTasks />
        </AppHeaderLink>
        <AppHeaderLink to="/deals">
          <IconDeals />
        </AppHeaderLink>
        <AppHeaderLink to="/login">
         login
        </AppHeaderLink>

        <UiButton @click="logout">
          logout
        </UiButton>
        <AppHeaderLink to="/login">

         logout
        </AppHeaderLink>
      </ul>
    </div>
  </div>
</template>
