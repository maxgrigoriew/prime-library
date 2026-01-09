<script lang="ts" setup>
import {ref, computed, onMounted} from 'vue'

defineOptions({
  name: 'UiTestTooltip'
})

type Props = {
  byClick?: boolean
}

const {
  byClick = true
} = defineProps<Props>()

const isVisible = ref(false)
const trigger = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)

// Динамические обработчики для триггера
const on = computed(() => {
  const events: Record<string, any> = {}

  if (byClick) {
    events.click = handleShowToolti
  } else {
    events.mouseenter = handleShowToolti
    events.mouseleave = handleHideToolti
  }
  console.log(events)

  return events
})

const handleShowToolti = (event: Event) => {
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

const handleHideToolti = () => {
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

    <div v-if="isVisible" class="content" ref="content">
      <slot>
        content
      </slot>
    </div>
  </div>
</template>