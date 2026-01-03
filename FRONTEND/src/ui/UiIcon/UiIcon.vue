<template>
  <inline-svg
      src="./assets/icons/deals.svg"
      :width="iconSizeWidth"
      :height="iconSizeWidth"
  />
  {{iconUrl}}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import InlineSvg from 'vue-inline-svg'
import { ICON_CLASSES_BY_SIZE } from './constants'
import type { IconSize } from './types'

defineOptions({
  name: 'UiIcon'
})

type Props = {
  iconName: string
  size?: IconSize
  customSize?: string
}

const {
  size = 'sm',
  customSize = '',
  iconName
} = defineProps<Props>()

const iconSizeClass = computed(() => ICON_CLASSES_BY_SIZE[size])
const iconUrl = new URL(`./assets/icons/${iconName}.svg`, import.meta.url).href;
const iconSizeWidth = computed(() => customSize || iconSizeClass.value)
</script>
