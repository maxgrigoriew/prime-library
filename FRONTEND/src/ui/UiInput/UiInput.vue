<script setup lang="ts">

defineOptions({
  name: 'UiInput',
})

type Props = {
  title: string
}

defineProps<Props>()

const modelValue = defineModel<string>()

</script>

<template>
  <div class="flex flex-col gap-4 rounded-[8px]">
    <span class="text-xs">{{title}}</span>
    <input type="text" v-model="modelValue" class="w-100% rounded-[4px] px-8 py-4 border border-grey-3">
  </div>
</template>
