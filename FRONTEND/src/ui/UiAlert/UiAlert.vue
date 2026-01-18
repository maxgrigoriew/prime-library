<script setup lang="ts">

import type {AlertType} from "./types.ts";
import {computed} from "vue";
import {ALERT_CLASSES_BY_TYPE} from "./constants.ts";

defineOptions({
  name: 'UiAlert',
})

type Props = {
  text?: string
  icon?: string
  type?: AlertType
}

const {
  type = 'primary',
  icon = ''
} = defineProps<Props>()


const alertTypeClass = computed(() => ALERT_CLASSES_BY_TYPE[type])
</script>

<template>
  <div class="flex gap-8 rounded-[8px] px-16 py-12" :class="alertTypeClass">
    <div>
      <i class="pi pi-info-circle" />
    </div>
    <div class="text-sm">
      <slot/>
    </div>
  </div>
</template>
