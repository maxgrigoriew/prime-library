<script setup lang="ts">

import IconEyeOpened from '@/assets/icons/eye_opened.svg?component'
import IconEyeClosed from '@/assets/icons/eye_closed.svg?component'
import {computed, ref} from "vue";

defineOptions({
  name: 'UiInput',
  components: {
    IconEyeOpened,
    IconEyeClosed
  }
})

type Props = {
  title: string
  placeholder?: string
  visible?: boolean
}

const {
  title,
  placeholder,
  visible = true,
} = defineProps<Props>()

const emit = defineEmits<{
  'toggle': [boolean]
}>()

const isVisible = ref(visible)

const modelValue = defineModel<string>()
const type = computed(() => isVisible.value ? 'text' : 'password')
const inputClasses = computed(() => !visible ? 'pr-32' : '')

const currentIcon = computed(() => isVisible.value ? 'IconEyeOpened' : 'IconEyeClosed')

const togglePasswordVisible = () => {
  isVisible.value = !isVisible.value

  emit('toggle', isVisible.value)
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
          class="w-100% rounded-[4px] px-8 py-4 border border-grey-3"
      >
      <div v-if="!visible" class="absolute absolut right-8 top-1/2 -translate-y-1/2 cursor-pointer bg-grey-1"
        @click="togglePasswordVisible"
      >
        <component :is="currentIcon" />
      </div>
    </div>
  </div>
</template>
