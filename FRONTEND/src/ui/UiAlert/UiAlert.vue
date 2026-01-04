<script setup lang="ts">

import type {AlertType} from "./types.ts";
import {computed} from "vue";
import {ALERT_CLASSES_BY_TYPE} from "./constants.ts";

defineOptions({
  name: 'UiAlert',
  components: {
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
  <template>
    <div class="flex gap-32" :class="alertTypeClass">
      <div class="">
        <component :is="iconComponent"/>
      </div>
      <div class="">
        <slot/>
      </div>
    </div>
  </template>
</template>
