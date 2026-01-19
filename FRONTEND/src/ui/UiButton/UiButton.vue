<script setup lang="ts">
import type {HTMLAttributes} from 'vue'
import type {ButtonType, ButtonSize} from './types.ts'
import {computed} from 'vue'
import {cn} from '@/lib/utils'
import {BUTTON_CLASSES_BY_TYPE} from './constants.ts'

defineOptions({
  name: 'UiButton',
  inheritAttrs: false,
})

type Props = {
  text?: string
  type?: ButtonType
  disabled?: boolean
  class?: HTMLAttributes['class']
  size?: ButtonSize
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  disabled: false,
  size: 'md'
})

const buttonClass = computed(() =>
    cn(
        'text-black text-base bg-gray-200 hover:bg-gray-300',
        BUTTON_CLASSES_BY_TYPE[props.size],
        props.disabled && 'bg-gray-100 cursor-default opacity-50',
        props.class
    )
)
</script>

<template>
  <button
      :disabled="disabled"
      :class="buttonClass"
      v-bind="$attrs"
  >
    <slot>
      {{ text }}
    </slot>
  </button>
</template>
