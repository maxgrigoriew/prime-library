<script setup>

import {onMounted} from "vue";
import {sessionCheck} from "@/entities/auth/api/methods/sessionCheck.js";
import {useCheckDevice} from "@/entities/device/hooks/useCheckDevice.js";

const isMobile = useCheckDevice()
onMounted(async () => {

  const data = await sessionCheck({})
  console.log('data', data)
})
</script>
<template>
  {{isMobile}}
  <div class="grid-layout p-4 gap-12 bg-gray-100">
    <div class="greeting bg-blue-1 text-white p-4">greeting</div>
    <div class="profile bg-gray-2 p-4">profile</div>
    <div class="funnel bg-white p-4">funnel</div>
    <div class="notes bg-white p-4">notes</div>
    <div class="calendar bg-gray-3 p-4">calendar</div>
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