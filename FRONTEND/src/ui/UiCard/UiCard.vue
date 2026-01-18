<script setup lang="ts">
import type { CardSize, CardVariant } from './types'
import { computed } from 'vue'
import { CARD_CLASSES_BY_VARIANT } from './constants'

defineOptions({
  name: 'UiCard'
})

type Props = {
  title?: string
  subtitle?: string
  size?: CardSize
  variant?: CardVariant
  headerClass?: string
  bodyClass?: string
  footerClass?: string
}

const {
  title,
  subtitle,
  size = 'md',
  variant = 'elevated',
  headerClass = '',
  bodyClass = '',
  footerClass = ''
} = defineProps<Props>()

const cardVariantClass = computed(() => CARD_CLASSES_BY_VARIANT[variant])

const sizeClasses = computed(() => {
  switch (size) {
    case 'sm':
      return 'p-4'
    case 'lg':
      return 'p-8'
    case 'md':
    default:
      return 'p-6'
  }
})
</script>

<template>
  <div :class="[cardVariantClass, sizeClasses, 'rounded-lg']">
    <!-- Header Section -->
    <div v-if="$slots.header || title" :class="['pb-4', headerClass]">
      <slot name="header">
        <h3 v-if="title" class="text-lg font-semibold text-grey-5">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="text-sm text-gray-400 mt-1">
          {{ subtitle }}
        </p>
      </slot>
    </div>

    <!-- Body Section -->
    <div :class="['flex-grow', bodyClass]">
      <slot />
    </div>

    <!-- Footer Section -->
    <div v-if="$slots.footer" :class="['pt-4', footerClass]">
      <slot name="footer" />
    </div>
  </div>
</template>
