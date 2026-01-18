<template>
  <div
      ref="tableContainer"
      class="infinity-table-container"
      :style="{ height: `${height}px` }"
      @scroll="handleScroll"
  >
    <!-- Заголовок таблицы -->
    <div
        ref="headerContainer"
        class="infinity-table-header"
        :style="headerStyle"
    >
      <table class="infinity-table">
        <thead>
        <template #header>
          <th class="col-num">Номер сделки</th>
          <th class="col-client">ИНН и название клиента</th>
          <th class="col-date">Дата создания</th>
          <th class="col-date">Плановая дата заключения договора</th>
          <th class="col-date">Фактическая дата заключения договора</th>
          <th class="col-services">Услуги</th>
          <th class="col-stage">Этап сделки</th>
          <th class="col-date">Дата тендера</th>
          <th class="col-name">Наименование сделки</th>
        </template>
        </thead>
      </table>
    </div>

    <!-- Тело таблицы с виртуализацией -->
    <div
        ref="bodyContainer"
        class="infinity-table-body"
        :style="bodyStyle"
    >
      <div :style="virtualizerStyle">
        <table class="infinity-table">
          <tbody>
          <tr
              v-for="row in visibleRows"
              :key="getRowKey(row)"
              :class="[rowClasses, { 'selected': isRowSelected(row) }]"
              @click="handleRowClick(row)"
          >
            <td
                v-for="column in columns"
                :key="column.key"
                :style="getColumnStyle(column)"
                :class="column.cellClass"
            >
              <slot
                  :name="`cell-${column.key}`"
                  :row="row"
                  :column="column"
                  :value="row[column.key]"
              >
                {{ formatCellValue(row[column.key], column) }}
              </slot>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Индикатор загрузки -->
    <div
        v-if="loading"
        class="infinity-table-loading"
    >
      <slot name="loading">
        Загрузка...
      </slot>
    </div>

    <!-- Сообщение об отсутствии данных -->
    <div
        v-if="!loading && items.length === 0"
        class="infinity-table-empty"
    >
      <slot name="empty">
        Нет данных
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  // Массив данных
  items: {
    type: Array,
    required: true,
    default: () => []
  },

  // Конфигурация колонок
  columns: {
    type: Array,
    required: true,
    default: () => []
  },

  // Высота контейнера
  height: {
    type: Number,
    default: 400
  },

  // Высота строки
  rowHeight: {
    type: Number,
    default: 48
  },

  // Высота заголовка
  headerHeight: {
    type: Number,
    default: 56
  },

  // Задержка перед загрузкой новых данных (мс)
  loadDebounce: {
    type: Number,
    default: 150
  },

  // Порог срабатывания загрузки (пиксели от конца)
  loadThreshold: {
    type: Number,
    default: 100
  },

  // Флаг загрузки
  loading: {
    type: Boolean,
    default: false
  },

  // Ключ для идентификации строк
  rowKey: {
    type: [String, Function],
    default: 'id'
  },

  // CSS классы для строк
  rowClasses: {
    type: [String, Array, Object],
    default: ''
  },

  // Выделенные строки
  selectedRows: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'load-more',
  'row-click',
  'scroll',
  'selection-change'
])

// Refs
const tableContainer = ref(null)
const headerContainer = ref(null)
const bodyContainer = ref(null)

// Состояние виртуализации
const scrollTop = ref(0)
const visibleStartIndex = ref(0)
const visibleEndIndex = ref(0)
const loadTimeout = ref(null)

// Вычисляемые свойства
const totalHeight = computed(() => props.items.length * props.rowHeight)
const visibleCount = computed(() => Math.ceil(props.height / props.rowHeight) + 2)

const visibleRows = computed(() => {
  return props.items.slice(visibleStartIndex.value, visibleEndIndex.value)
})

const virtualizerStyle = computed(() => ({
  height: `${totalHeight.value}px`,
  transform: `translateY(${visibleStartIndex.value * props.rowHeight}px)`
}))

const bodyStyle = computed(() => ({
  height: `${props.height - props.headerHeight}px`
}))

const headerStyle = computed(() => ({
  height: `${props.headerHeight}px`
}))

// Методы
const getRowKey = (row) => {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(row)
  }
  return row[props.rowKey]
}

const getColumnStyle = (column) => {
  return {
    width: column.width || 'auto',
    minWidth: column.minWidth,
    maxWidth: column.maxWidth,
    textAlign: column.align || 'left'
  }
}

const formatCellValue = (value, column) => {
  if (column.formatter && typeof column.formatter === 'function') {
    return column.formatter(value)
  }
  return value
}

const isRowSelected = (row) => {
  return props.selectedRows.some(selectedRow =>
      getRowKey(selectedRow) === getRowKey(row)
  )
}

const handleScroll = (event) => {
  const { scrollTop: newScrollTop, scrollHeight, clientHeight } = event.target

  scrollTop.value = newScrollTop
  updateVisibleRange()

  emit('scroll', {
    scrollTop: newScrollTop,
    scrollHeight,
    clientHeight
  })

  // Проверка необходимости загрузки новых данных
  const distanceFromBottom = scrollHeight - (newScrollTop + clientHeight)

  if (distanceFromBottom < props.loadThreshold && !props.loading) {
    clearTimeout(loadTimeout.value)
    loadTimeout.value = setTimeout(() => {
      emit('load-more')
    }, props.loadDebounce)
  }
}

const handleRowClick = (row) => {
  emit('row-click', row)

  // Обработка выделения
  if (props.rowSelection) {
    emit('selection-change', row)
  }
}

const updateVisibleRange = () => {
  const startIndex = Math.max(
      0,
      Math.floor(scrollTop.value / props.rowHeight) - 1
  )

  const endIndex = Math.min(
      props.items.length,
      startIndex + visibleCount.value + 2
  )

  visibleStartIndex.value = startIndex
  visibleEndIndex.value = endIndex
}

const scrollToRow = (index) => {
  if (tableContainer.value && index >= 0 && index < props.items.length) {
    const scrollPosition = index * props.rowHeight
    tableContainer.value.scrollTop = scrollPosition
  }
}

// Наблюдатели
watch(() => props.items, () => {
  updateVisibleRange()
}, { deep: true })

// Жизненный цикл
onMounted(() => {
  updateVisibleRange()
})

onUnmounted(() => {
  if (loadTimeout.value) {
    clearTimeout(loadTimeout.value)
  }
})

// Экспорт методов
defineExpose({
  scrollToRow,
  updateVisibleRange
})
</script>

<style scoped>
.infinity-table-container {
  position: relative;
  overflow: auto;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
}

.infinity-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.infinity-table-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  border-bottom: 2px solid #e5e7eb;
  overflow: hidden;
}

.infinity-table-header table {
  border-bottom: none;
}

.infinity-table-body {
  position: relative;
  overflow: auto;
}

.infinity-table-body table {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.infinity-table th,
.infinity-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #f3f4f6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.infinity-table th {
  font-weight: 600;
  color: #374151;
  background: #f9fafb;
  user-select: none;
}

.infinity-table tbody tr {
  transition: background-color 0.2s;
  cursor: pointer;
}

.infinity-table tbody tr:hover {
  background-color: #f9fafb;
}

.infinity-table tbody tr.selected {
  background-color: #dbeafe;
}

.infinity-table-loading,
.infinity-table-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  color: #6b7280;
  font-size: 14px;
}
</style>