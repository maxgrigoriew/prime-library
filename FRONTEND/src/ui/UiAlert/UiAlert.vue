<script setup lang="ts">

import type {AlertType} from "./types.ts";
import {computed} from "vue";
import {ALERT_CLASSES_BY_TYPE} from "./constants.ts";
import IconInfo from '@/assets/icons/info.svg?component'

defineOptions({
  name: 'UiAlert',
  components: {
    IconInfo
  }
})

type Props = {
  text?: string
  icon?: string
  type?: AlertType
}

const {
  type = 'primary',
  icon = 'Info'
} = defineProps<Props>()


const alertTypeClass = computed(() => ALERT_CLASSES_BY_TYPE[type])
const iconComponent = computed(() => 'Icon' + icon)
</script>

<template>
  <div class="flex gap-32 rounded-[8px] px-16 py-12" :class="alertTypeClass">
    <div>
      <component :is="iconComponent"/>
    </div>
    <div class="text-sm">
      <slot/>
    </div>
  </div>
</template>
