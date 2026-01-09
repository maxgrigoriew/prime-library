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
}

const {
  byClick = true,
  offset = 10,
  placement = 'top'
} = defineProps<Props>()

const isVisible = ref(true)

const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)

const triggerRect = ref<DOMRect | null>(null)
const tooltipRect = ref<DOMRect | null>(null)

const tooltipPositionStyles = computed(() => {
  console.log('triggerRect.value?.top', triggerRect.value?.top)
  return {
    top: triggerRect.value?.top,
    left: triggerRect.value?.left
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
  tooltipRect.value = triggerRef.value?.getBoundingClientRect()

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
  @apply fixed left-0 top-0 bg-grey-1 p-12 p-12 rounded-12;
}

.bottom {
  @apply top-full left-1/2 -translate-x-1/2;
}

.left {
  @apply right-full top-1/2 -translate-y-1/2;
}

.right {
  @apply left-full top-1/2 -translate-y-1/2;
}
</style>