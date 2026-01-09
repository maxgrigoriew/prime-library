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
        class="tooltip good"
        :style="tooltipStyle"
        ref="tooltipRef"
    >
      <div class="content">
        <slot name="content"/>
      </div>
      <div class="position-info">
        Позиция: {{ tooltipStyle.left }}, {{ tooltipStyle.top }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, nextTick} from 'vue'



const props = defineProps({
  label: {type: String, default: 'Наведи на меня'}
})

const triggerRef = ref(null)
const tooltipRef = ref(null)
const isVisible = ref(false)
const position = ref({x: 0, y: 0})

const tooltipStyle = ref({
  left: '0px',
  top: '0px',
  opacity: '0',
  backgroundColor: '#10b981'
})

// ✅ ХОРОШО: Сначала скрываем, считаем, потом показываем
const show = async () => {
  isVisible.value = true


  // 2. Ждем рендера (тултип в DOM, но невидимый)
  await nextTick()
  console.log('tooltipRef 2', tooltipRef.value)

  // 3. Считаем позицию пока тултип невидим
  calculatePosition()
    tooltipStyle.value.opacity = '1'

  console.log('✅ GoodTooltip: Тултип показан сразу в правильной позиции', position.value)
}

const hide = () => {
  isVisible.value = false
}

const calculatePosition = () => {
  if (!triggerRef.value || !tooltipRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()

  // Простая позиция: под триггером
  position.value = {
    x: triggerRect.left,
    y: triggerRect.bottom + 10
  }

  tooltipStyle.value = {
    ...tooltipStyle.value,
    left: `${position.value.x}px`,
    top: `${position.value.y}px`
  }
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
  transition: background 2s;
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
  transition: opacity 1s ease-out;
}

</style>