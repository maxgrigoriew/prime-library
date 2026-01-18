<script setup lang="ts">
import type { DataTableColumn, SortOrder } from './types'
import { ref, computed } from 'vue'

defineOptions({
  name: 'UiDataTable'
})

type Props<T = any> = {
  value: T[]
  columns: DataTableColumn[]
  stripedRows?: boolean
  responsiveLayout?: 'stack' | 'scroll'
  sortMode?: 'single' | 'multiple'
  selection?: T | T[]
  selectionMode?: 'single' | 'multiple'
  paginator?: boolean
  rows?: number
  totalRecords?: number
}

const props = withDefaults(defineProps<Props>(), {
  stripedRows: false,
  responsiveLayout: 'stack',
  sortMode: 'single',
  selectionMode: 'single',
  paginator: false,
  rows: 10
})

const emit = defineEmits<{
  'row-select': [data: any]
  'row-unselect': [data: any]
  'sort': [sortField: string, sortOrder: SortOrder]
}>()

const sortField = ref<string | null>(null)
const sortOrder = ref<SortOrder>(0) // 0: none, 1: asc, -1: desc
const firstRowIndex = ref(0)

const sortedData = computed(() => {
  if (!sortField.value || sortOrder.value === 0) {
    return props.value
  }

  return [...props.value].sort((a, b) => {
    const valueA = getNestedValue(a, sortField.value!)
    const valueB = getNestedValue(b, sortField.value!)

    if (valueA == null && valueB == null) return 0
    if (valueA == null) return sortOrder.value
    if (valueB == null) return -sortOrder.value

    let result = 0

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      result = valueA.localeCompare(valueB)
    } else {
      result = valueA < valueB ? -1 : valueA > valueB ? 1 : 0
    }

    return sortOrder.value * result
  })
})

const paginatedData = computed(() => {
  if (!props.paginator) return sortedData.value

  const startIndex = firstRowIndex.value
  const endIndex = startIndex + props.rows
  return sortedData.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  if (!props.totalRecords && !props.value) return 0
  const total = props.totalRecords || props.value.length
  return Math.ceil(total / props.rows)
})

const isSelected = (item: any) => {
  if (!props.selection) return false
  
  if (Array.isArray(props.selection)) {
    return props.selection.some(selectedItem => selectedItem === item)
  }
  
  return props.selection === item
}

const toggleSelection = (item: any) => {
  if (props.selectionMode === 'single') {
    if (isSelected(item)) {
      emit('row-unselect', item)
    } else {
      emit('row-select', item)
    }
  } else {
    // Multiple selection logic would go here
    if (isSelected(item)) {
      emit('row-unselect', item)
    } else {
      emit('row-select', item)
    }
  }
}

const onSort = (column: DataTableColumn) => {
  if (!column.sortable) return

  if (sortField.value === column.field) {
    // Cycle through sort orders: none -> asc -> desc -> none
    if (sortOrder.value === 0) {
      sortOrder.value = 1
    } else if (sortOrder.value === 1) {
      sortOrder.value = -1
    } else {
      sortOrder.value = 0
    }
  } else {
    sortField.value = column.field
    sortOrder.value = 1
  }

  emit('sort', sortField.value, sortOrder.value)
}

const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

const onPageChange = (page: number) => {
  firstRowIndex.value = (page - 1) * props.rows
}
</script>

<template>
  <div class="overflow-x-auto rounded-lg border border-grey-2">
    <table class="min-w-full divide-y divide-grey-2">
      <!-- Table Header -->
      <thead class="bg-grey-50">
        <tr>
          <th 
            v-for="col in columns" 
            :key="col.field"
            :class="[
              'px-6 py-3 text-left text-xs font-medium text-grey-5 uppercase tracking-wider',
              col.class
            ]"
            :style="col.style"
          >
            <div 
              v-if="col.sortable" 
              class="flex items-center cursor-pointer hover:text-grey-7"
              @click="onSort(col)"
            >
              <span>{{ col.header }}</span>
              <svg 
                v-if="sortField === col.field && sortOrder === 1" 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-4 w-4 ml-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
              <svg 
                v-else-if="sortField === col.field && sortOrder === -1" 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-4 w-4 ml-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <svg 
                v-else 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-4 w-4 ml-1 opacity-30" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <span v-else>{{ col.header }}</span>
          </th>
        </tr>
      </thead>

      <!-- Table Body -->
      <tbody class="bg-white divide-y divide-grey-2">
        <tr 
          v-for="(item, index) in paginatedData" 
          :key="index"
          :class="[
            'hover:bg-grey-50',
            { 'bg-grey-50': stripedRows && index % 2 === 0, 'cursor-pointer': selectionMode },
            isSelected(item) ? 'bg-blue-50' : ''
          ]"
          @click="selectionMode ? toggleSelection(item) : null"
        >
          <td 
            v-for="col in columns" 
            :key="col.field"
            :class="['px-6 py-4 whitespace-nowrap text-sm text-grey-7', col.class]"
            :style="col.style"
          >
            <slot :name="col.field" :value="getNestedValue(item, col.field)" :data="item">
              {{ getNestedValue(item, col.field) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginator -->
    <div v-if="paginator" class="flex items-center justify-between border-t border-grey-2 px-4 py-3 bg-white">
      <div class="text-sm text-grey-7">
        Showing {{ firstRowIndex + 1 }} to {{ Math.min(firstRowIndex + rows, value.length) }} of {{ value.length }} results
      </div>
      <div class="flex space-x-2">
        <button 
          :disabled="firstRowIndex === 0"
          class="px-3 py-1 rounded border border-grey-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          @click="onPageChange(Math.max(1, Math.floor(firstRowIndex / rows)))"
        >
          Previous
        </button>
        <button 
          :disabled="firstRowIndex + rows >= value.length"
          class="px-3 py-1 rounded border border-grey-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          @click="onPageChange(Math.min(totalPages, Math.floor(firstRowIndex / rows) + 2))"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>