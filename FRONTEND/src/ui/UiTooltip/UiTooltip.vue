<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted, watch, nextTick} from 'vue'

type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

interface Props {
  placement?: TooltipSide
  offset?: number
  delay?: number
  showArrow?: boolean
  maxWidth?: string
  tabindex?: number
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  openOnClick?: boolean
  closeOnClickOutside?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top',
  offset: 18,
  delay: 0,
  showArrow: true,
  maxWidth: 'max-w-[400px]',
  tabindex: 0,
  backgroundColor: 'bg-white',
  textColor: 'text-black',
  borderColor: 'red',
  openOnClick: false,
  closeOnClickOutside: true
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const timeoutId = ref<number | null>(null)
const currentPlacement = ref(props.placement)

// Вычисляемые классы для стилей
const tooltipStyleClasses = computed(() => [
  props.backgroundColor,
  props.textColor,
  props.borderColor,
  props.maxWidth
])

// Классы для позиционирования стрелки
const arrowClasses = computed(() => {
  const positionMap = {
    top: '-bottom-1 left-1/2 -translate-x-1/2',
    bottom: '-top-1 left-1/2 -translate-x-1/2',
    left: '-right-1 top-1/2 -translate-y-1/2',
    right: '-left-1 top-1/2 -translate-y-1/2'
  }
  return `${positionMap[currentPlacement.value]}`
})

// Классы для позиционирования тултипа
const tooltipPositionClasses = computed(() => {
  const map = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }
  return map[currentPlacement.value]
})

// Показ тултипа
const showTooltip = () => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
  }

  isVisible.value = true
  emit('update:visible', true)
  nextTick(() => adjustPosition())

}

// Скрытие тултипа
const hideTooltip = () => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
    timeoutId.value = null
  }
  isVisible.value = false
  emit('update:visible', false)
}

// Обработчики для hover на самом тултипе
const handleTooltipMouseEnter = () => {
  if (!props.openOnClick) {
    // TODO: исправить clearTimeout(timeoutId.value)
  }
}

const handleTooltipMouseLeave = () => {
  if (!props.openOnClick) {
    hideTooltip()
  }
}

// Функция для корректировки позиции при необходимости
const adjustPosition = () => {
  if (!triggerRef.value || !tooltipRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  let newPlacement = props.placement

  // Проверяем, помещается ли тултип в текущей позиции
  switch (props.placement) {

    case 'top':
      if (triggerRect.top - tooltipRect.height - props.offset < 0) {
        newPlacement = 'bottom'
      }
      break
    case 'bottom':
      if (triggerRect.bottom + tooltipRect.height + props.offset > viewportHeight) {
        newPlacement = 'top'
      }
      break
    case 'left':
      if (triggerRect.left - tooltipRect.width - props.offset < 0) {
        newPlacement = 'right'
      }
      break
    case 'right':
      if (triggerRect.right + tooltipRect.width + props.offset > viewportWidth) {
        newPlacement = 'left'
      }
      break
  }

  currentPlacement.value = newPlacement
}

// Обработка кликов вне тултипа
const handleClickOutside = (event: MouseEvent) => {
  if (
      props.closeOnClickOutside &&
      isVisible.value &&
      tooltipRef.value &&
      !tooltipRef.value.contains(event.target as Node) &&
      triggerRef.value &&
      !triggerRef.value.contains(event.target as Node)
  ) {
    hideTooltip()
  }
}

// Обработка кликов для режима openOnClick
const handleTriggerClick = () => {
  if (props.openOnClick) {
    if (isVisible.value) {
      hideTooltip()
    } else {
      showTooltip()
    }
  }
}

// Lifecycle hooks
onMounted(() => {
  if (props.openOnClick && triggerRef.value) {
    triggerRef.value.addEventListener('click', handleTriggerClick)
  }

  if (props.closeOnClickOutside) {
    document.addEventListener('mousedown', handleClickOutside)
  }

  window.addEventListener('resize', adjustPosition)
  window.addEventListener('scroll', adjustPosition)
})

onUnmounted(() => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value)
  }

  if (props.openOnClick && triggerRef.value) {
    triggerRef.value.removeEventListener('click', handleTriggerClick)
  }

  if (props.closeOnClickOutside) {
    document.removeEventListener('mousedown', handleClickOutside)
  }

  window.removeEventListener('resize', adjustPosition)
  window.removeEventListener('scroll', adjustPosition)
})

// Отслеживаем изменения видимости для корректировки позиции
watch(isVisible, (newValue) => {
  if (newValue) {
    nextTick(() => adjustPosition())
  }
})
</script>

<template>
  <div class="relative inline-block">
    <!-- Trigger element slot -->
    <div
        ref="triggerRef"
        @mouseenter="showTooltip"
        @mouseleave="hideTooltip"
        @focus="showTooltip"
        @blur="hideTooltip"
        :tabindex="tabindex"
        class="inline-block"
    >
      <slot name="trigger"/>
    </div>

    <!-- Tooltip content -->
    <div
        v-if="false"
        ref="tooltipRef"
        :class="[
        tooltipStyleClasses,
        tooltipPositionClasses
      ]"
        class="absolute z-50 p-12 text-sm w-full font-medium rounded-lg shadow-lg transition-opacity duration-200"
        @mouseenter="handleTooltipMouseEnter"
        @mouseleave="handleTooltipMouseLeave"
    >
      <!-- Tooltip arrow -->
      <div
          v-if="true"
          :class="arrowClasses"
          class="absolute w-8 h-8 bg-red rotate-45"
      />

      <!-- Tooltip content slot -->
      <slot/>
    </div>
  </div>
</template>

<style scoped>
/* Плавная анимация появления */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>