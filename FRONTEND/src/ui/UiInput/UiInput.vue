<script setup lang="ts">

import {computed, ref} from "vue";

defineOptions({
  name: 'UiInput',
})

type Props = {
  title?: string
  placeholder?: string
  isPasswordMode?: boolean
}

const {
  title,
  placeholder,
  isPasswordMode = true,
} = defineProps<Props>()

const emit = defineEmits<{
  'toggle': [boolean]
}>()

const isVisibleIcon = ref(isPasswordMode)

const modelValue = defineModel<string>()
const type = computed(() => isVisibleIcon.value ? 'text' : 'password')
const inputClasses = computed(() => !isPasswordMode ? 'pr-32' : '')

const currentIcon = computed(() => isVisibleIcon.value ? 'pi pi-eye' : 'pi pi-eye-slash')

const togglePasswordVisible = () => {
  isVisibleIcon.value = !isVisibleIcon.value

  emit('toggle', isVisibleIcon.value)
}
</script>

<template>
  <div class="flex flex-col gap-4 rounded-[8px]">
    <span class="text-xs">{{title}}</span>
    <div class="relative">
      <input
          :type="type"
          v-model="modelValue"
          :class="inputClasses"
          :placeholder="placeholder"
          class="w-100% rounded-[4px] px-8 py-4 border border-gray-3"
      >
      <div v-if="!isPasswordMode" class="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer "
        @click="togglePasswordVisible"
      >
        <slot name="icon">
          <i :class="currentIcon"></i>
        </slot>
      </div>
    </div>
  </div>
</template>
