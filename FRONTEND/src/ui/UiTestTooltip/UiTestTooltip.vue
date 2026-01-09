<script lang="ts" setup>
import {ref, computed, onMounted} from 'vue'

type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

defineOptions({
  name: 'UiTestTooltip'
})

type Props = {
  byClick?: boolean,
  offset?: number
  placement: TooltipSide
  width: number
}

const {
  byClick = true,
  offset = 12,
  placement = 'top',
  width = 400
} = defineProps<Props>()

const isVisible = ref(true)

const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)

const triggerRect = ref<DOMRect | null>(null)
const tooltipRect = ref<DOMRect | null>(null)

const tooltipPositionStyles = computed(() => {
  if (!triggerRect.value || !tooltipRect.value) {
    return {}
  }

  let top = 0
  let left = 0

  switch (placement) {
    case 'top':
      top = triggerRect.value.top - tooltipRect.value.height - offset
      left = triggerRect.value.left + (triggerRect.value.width / 2) - (tooltipRect.value.width / 2)
      break

    case 'bottom':
      top = triggerRect.value.bottom + offset
      left = triggerRect.value.left + (triggerRect.value.width / 2) - (tooltipRect.value.width / 2)
      break

    case 'left':
      top = triggerRect.value.top + (triggerRect.value.height / 2) - (tooltipRect.value.height / 2)
      left = triggerRect.value.left - tooltipRect.value.width - offset
      break

    case 'right':
      top = triggerRect.value.top + (triggerRect.value.height / 2) - (tooltipRect.value.height / 2)
      left = triggerRect.value.right + offset
      break
  }

  // Учитываем скролл страницы
  const scrollX = window.scrollX
  const scrollY = window.scrollY

  return {
    top: `${top + scrollY}px`,
    left: `${left + scrollX}px`,
    position: 'fixed', // важно для корректного позиционирования
    zIndex: '9999',
  }
})

// Динамические обработчики для триггера
const on = computed(() => {
  const events: Record<string, object> = {}

  if (byClick) {
    events.click = handleShowTooltip
  } else {
    events.mouseenter = handleShowTooltip
    events.mouseleave = handleHideTooltip
  }

  return events
})

const handleShowTooltip = (event: Event) => {
  /* Отключаем всплытие чтобы handelClickOutlide не срабатывал и не акрывал обратно tooltip*/
  event.stopPropagation()

  if (isVisible.value) {
    return
  }

  isVisible.value = true
}

const handleClickOutside = (event: Event) => {
  if (!byClick || !isVisible.value) {
    return
  }

  const target = event.target as HTMLElement

  if (target.closest('.tooltip-wrapper')) {
    return
  }

  isVisible.value = false
}

const handleHideTooltip = () => {
  isVisible.value = false
}

const calculateTooltipPosition = () => {

  if (!triggerRef.value || !tooltipRef.value) {
    return
  }

  triggerRect.value = triggerRef.value?.getBoundingClientRect()
  tooltipRect.value = tooltipRef.value?.getBoundingClientRect()

  console.log(triggerRect.value)
  console.log(tooltipRect.value)
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  calculateTooltipPosition()
})
</script>

<template>
  <div class="tooltip-wrapper">
    <div class="trigger" v-on="on" ref="triggerRef">
      <slot name="trigger"></slot>
    </div>

    <div v-if="isVisible" :class="placement" :style="tooltipPositionStyles" class="content" ref="tooltipRef">
      <slot>
        content
      </slot>
    </div>
  </div>
</template>

<style lang="postcss" scoped>

.tooltip-wrapper {
  @apply relative inline-block;
}

.content {
  @apply fixed left-0 top-0 bg-grey-1 p-12 p-12 rounded-12 w-[300px];
}
</style>