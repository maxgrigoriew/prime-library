<script setup lang="ts">

import {computed, ref} from "vue";

defineOptions({
  name: 'UiInput',
})

type Props = {
  title?: string
  placeholder?: string
  isPasswordMode?: boolean
  type: string
  inputClasses: string
}

const {
  title,
  placeholder,
  type = 'text',
  inputClasses = ''
} = defineProps<Props>()

const modelValue = defineModel<string>()

</script>

<template>
  <div class="flex flex-col gap-4 rounded-[8px]">
    <span class="text-xs">{{ title }}</span>
    <div>
      <input
          :type="type"
          v-model="modelValue"
          :class="inputClasses"
          :placeholder="placeholder"
          class="w-100% rounded-[4px] px-8 py-4 border border-gray-200 shadow-custom text-zinc-600 font-medium"
      >
    </div>
  </div>
</template>
