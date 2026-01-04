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
}

const {
  type = 'primary',
  text
} = defineProps<Props>()


const buttonTypeClass = computed(() => BUTTON_CLASSES_BY_TYPE[type])
</script>

<template>
  <button :class="[buttonTypeClass]" class="rounded-[4px] px-8 py-2">
    <slot>
      {{text}}
    </slot>
  </button>
</template>

<style scoped>

</style>