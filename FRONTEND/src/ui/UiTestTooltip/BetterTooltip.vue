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
        class="tooltip better"
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

const triggerRef = ref(null)
const tooltipRef = ref(null)
const isVisible = ref(false)
const position = ref({ x: 0, y: 0 })

const tooltipStyle = ref({
  left: '0px',
  top: '0px',
  opacity: '0',
  backgroundColor: '#8b5cf6',
  transition: 'opacity 0.2s, transform 0.2s',
  transform: 'translateY(-10px)'
})

// ✅ ЛУЧШЕ: Показываем в следующем кадре анимации
const show = async () => {
  console.log('🚀 BetterTooltip: Начинаем показ с requestAnimationFrame')

  // 1. Показываем с opacity: 0
  isVisible.value = true

  // 2. Ждем рендера
  await nextTick()

  // 3. Считаем позицию
  calculatePosition()

  // 4. В следующем кадре анимации делаем видимым
  requestAnimationFrame(() => {
    tooltipStyle.value = {
      ...tooltipStyle.value,
      opacity: '1',
      transform: 'translateY(0)'
    }
    console.log('🚀 BetterTooltip: Анимация началась')
  })

  // 5. Можно добавить еще один rAF для дополнительной плавности
  requestAnimationFrame(() => {
    console.log('🚀 BetterTooltip: Тултип полностью видим')
  })
}

const hide = () => {
  // Плавное скрытие
  tooltipStyle.value.opacity = '0'
  tooltipStyle.value.transform = 'translateY(-10px)'

  setTimeout(() => {
    isVisible.value = false
  }, 200)
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
    ...tooltipStyle.value,
    left: `${position.value.x}px`,
    top: `${position.value.y}px`
  }
}
</script>

<style scoped>
.tooltip.better {
  background: #8b5cf6;
  border: 2px solid #7c3aed;
}
</style>