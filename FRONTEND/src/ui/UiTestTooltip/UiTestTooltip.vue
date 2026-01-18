<script lang="ts" setup>
import {ref, computed, onMounted, watch, nextTick} from 'vue'

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
  byClick = false,
  offset = 12,
  placement = 'bottom',
  width = 400
} = defineProps<Props>()

const isVisible = ref(false)

const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)

const currentPlacement = ref(placement)

const triggerRect = ref<DOMRect | null>(null)
const tooltipRect = ref<DOMRect | null>(null)

const tooltipPositionStyles = computed(() => {
  console.log('position style')
  if (!triggerRect.value || !tooltipRect.value) {
    return {}
  }

  let top = 0
  let left = 0

  switch (currentPlacement.value) {
    case 'top':
      // if (triggerRect.value.top <= tooltipRect.value.height + offset ) {
      //   currentPlacement.value = 'bottom'
      // }
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

  return {
    top: `${top}px`,
    left: `${left}px`,
  }
})


// Динамические обработчики для триггера
const on = computed(() => {
  const events: Record<string, object> = {}

  if (byClick) {
    console.log(123)
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
  console.log('calculate')
  if (!triggerRef.value || !tooltipRef.value) {
    return
  }

  triggerRect.value = triggerRef.value?.getBoundingClientRect()
  tooltipRect.value = tooltipRef.value?.getBoundingClientRect()


}

watch(isVisible, async () => {
  if (!isVisible.value) {
    return
  }

  await nextTick()
  calculateTooltipPosition()

})

onMounted(() => {
  calculateTooltipPosition()

  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', calculateTooltipPosition)
  window.addEventListener('scroll', calculateTooltipPosition)
})
</script>

<template>
  <div class="tooltip-wrapper">
    <div class="trigger" v-on="on" ref="triggerRef">
      <slot name="trigger"></slot>
    </div>

    <div v-if="isVisible" :class="currentPlacement" :style="tooltipPositionStyles" class="content" ref="tooltipRef">
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
  @apply fixed left-0 top-0 bg-gray-200 p-12 rounded-12 w-[300px];
}
</style>