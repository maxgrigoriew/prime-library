<template>
  <div class="tooltip-wrapper">
    <div
        class="trigger"
        @mouseenter="show"
        @mouseleave="hide"
        ref="triggerRef"
    >
      {{ label }}
    </div>

    <div
        v-if="isVisible"
        class="tooltip bad"
        :style="tooltipStyle"
        ref="tooltipRef"
    >
      <div class="content">
        <slot name="content" />
      </div>
      <div class="position-info">
        Позиция: {{ tooltipStyle.left }}, {{ tooltipStyle.top }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  label: { type: String, default: 'Наведи на меня' }
})

const emit = defineEmits(['log'])

const triggerRef = ref(null)
const tooltipRef = ref(null)
const isVisible = ref(false)
const position = ref({ x: 0, y: 0 })

const tooltipStyle = ref({
  left: '0px',
  top: '0px',
  backgroundColor: '#ef4444',
  visibility: 'hidden'
})

// ❌ ПЛОХО: Показываем сразу, потом считаем позицию
const show = async () => {
  console.log('❌ BadTooltip: Показываем тултип')

  // 1. Сразу делаем видимым
  isVisible.value = true

  // 2. Ждем рендера (тултип появится в 0,0)
  await nextTick()

  // 3. Теперь считаем позицию

  calculatePosition()
  tooltipStyle.value.visibility = 'visible'

  console.log('❌ BadTooltip: Тултип уже был показан в (0,0), теперь двигаем в', position.value)
}

const hide = () => {
  isVisible.value = false
}

const calculatePosition = () => {
  if (!triggerRef.value || !tooltipRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()

  // Простая позиция: под триггером
  position.value = {
    x: triggerRect.left,
    y: triggerRect.bottom + 10
  }

  tooltipStyle.value = {
    left: `${position.value.x}px`,
    top: `${position.value.y}px`,
    backgroundColor: '#ef4444',
    visibility: 'hidden'
  }

  console.log('❌ BadTooltip: Перемещаем тултип в', position.value)
}
</script>

<style scoped>
.tooltip-wrapper {
  display: inline-block;
}

.trigger {
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.trigger:hover {
  background: #2563eb;
}

.tooltip {
  position: fixed;
  padding: 12px 16px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.1s; /* Быстрая анимация чтобы видеть прыжок */
}

.tooltip.bad {
  background: #ef4444;
  border: 2px dashed #dc2626;
}

.position-info {
  font-size: 10px;
  opacity: 0.8;
  margin-top: 4px;
  font-family: monospace;
}
</style>