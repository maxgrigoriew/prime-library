<script lang="ts" setup>

defineOptions({
  name: 'Greeting'
})

type Props = {
  firstName: string,
  today: string
}

const { firstName, today } = defineProps<Props>()
</script>

<template>
  <div class="flex flex-col justify-between bg-blue-2 text-white p-[50px] rounded-[12px]">
    <div class="text-2xl font-bold">Привет, {{firstName}}</div>
    <div>{{today}}</div>
  </div>
</template>