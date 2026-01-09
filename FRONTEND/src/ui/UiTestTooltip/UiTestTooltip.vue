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
const trigger = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)

// Динамические обработчики для триггера
const on = computed(() => {
  const events: Record<string, object> = {}

  if (byClick) {
    events.click = handleShowTooltip
  } else {
    events.mouseenter = handleShowTooltip
    events.mouseleave = handleHideTooltip
  }
  console.log(events)

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

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="tooltip-wrapper">
    <!-- Динамические обработчики через v-on -->
    <div class="trigger" v-on="on" ref="trigger">
      <slot name="trigger"></slot>
    </div>

    <div v-if="isVisible" :class="placement" class="content" ref="content">
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
  @apply absolute bg-grey-1 p-12 p-12 rounded-12;
}

.top {
  @apply bottom-full left-1/2 -translate-x-1/2;
}

.bottom {
  @apply top-full left-1/2 -translate-x-1/2;
}

.left{
  @apply right-full top-1/2 -translate-y-1/2;
}

.right {
  @apply left-full top-1/2 -translate-y-1/2;
}
</style>