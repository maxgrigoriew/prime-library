<script setup>

import {onMounted, ref} from "vue";
import {authFt} from "@/entities/auth/features/authFf.js";
const { getUser, user } = authFt()
onMounted(  () => {
    getUser()
})

</script>
<template>
  <div class="grid-layout p-4 gap-12 bg-gray-100">
    <div class="greeting flex flex-col justify-between bg-blue-2 text-white p-[50px] rounded-[12px]">
      <div class="text-2xl font-bold">Привет, {{user?.firstName}}</div>
      <div>{{new Date().toLocaleDateString()}}</div>
    </div>
    <div class="profile bg-blue-3 rounded-[12px] p-[12px]">


    </div>
    <div class="funnel bg-white rounded-[12px] p-[12px]">funnel</div>
    <div class="notes bg-white rounded-[12px] p-[12px]">notes</div>
    <div class="calendar bg-gray-3 rounded-[12px] p-[12px]">calendar</div>
  </div>
</template>

<style scoped>
.grid-layout {
  display: grid;
  grid-template-areas:
    "greeting greeting profile"
    "funnel notes calendar";
  grid-template-columns: 2fr 2fr 1fr;
  grid-template-rows: 300px auto;
}

.greeting { grid-area: greeting; }
.profile { grid-area: profile; }
.funnel { grid-area: funnel; }
.notes { grid-area: notes; }
.calendar { grid-area: calendar; }
</style>