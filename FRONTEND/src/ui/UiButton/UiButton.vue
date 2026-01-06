<script setup lang="ts">

import type {ButtonType} from "./types.ts";
import {computed} from "vue";
import {BUTTON_CLASSES_BY_TYPE} from "./constants.ts";

defineOptions({
  name: 'UiButton'
})

type Props = {
  text?: string
  type?: ButtonType
  disabled?: boolean
}

const {
  type = 'primary',
  text,
  disabled = false
} = defineProps<Props>()

const buttonTypeClass = computed(() => BUTTON_CLASSES_BY_TYPE[type])
</script>

<template>
  <button :disabled="disabled" :class="[buttonTypeClass]" class="rounded-[4px] px-12 py-6">
    <slot>
      {{ text }}
    </slot>
  </button>
</template>