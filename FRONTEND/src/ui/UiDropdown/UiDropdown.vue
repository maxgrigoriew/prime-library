<script setup lang="ts">
import type { DropdownOption, DropdownSize } from './types'
import { computed, ref, nextTick } from 'vue'

defineOptions({
  name: 'UiDropdown'
})

type Props = {
  options: DropdownOption[]
  placeholder?: string
  disabled?: boolean
  filter?: boolean
  appendTo?: string // 'body' or 'self'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
  filter: false,
  appendTo: 'self',3
})

const selectedValue = defineModel<any>()

const isOpen = ref(false)
const filterValue = ref('')
const dropdownRef = ref<HTMLElement>()
const filterInputRef = ref<HTMLInputElement>()

const filteredOptions = computed(() => {
  if (!props.filter || !filterValue.value) {
    return props.options
  }
  
  return props.options.filter(option => 
    option.label.toLowerCase().includes(filterValue.value.toLowerCase())
  )
})

const selectedOption = computed(() => {
  return props.options.find(option => option.value === selectedValue.value) || null
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'py-2 px-3 text-sm'
    case 'lg':
      return 'py-4 px-5 text-lg'
    case 'md':
    default:
      return 'py-3 px-4 text-base'
  }
})

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
    if (isOpen.value && props.filter) {
      nextTick(() => {
        filterInputRef.value?.focus()
      })
    }
  }
}

const selectOption = (option: DropdownOption) => {
  if (!option.disabled) {
    selectedValue.value = option.value
    isOpen.value = false
    filterValue.value = ''
  }
}

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
    filterValue.value = ''
  }
}

// Handle clicks outside the dropdown
const handleDocumentClick = (event: Event) => {
  handleClickOutside(event)
}

// Add event listener when dropdown opens
if (isOpen.value) {
  document.addEventListener('click', handleDocumentClick)
} else {
  document.removeEventListener('click', handleDocumentClick)
}
</script>

<template>
  <div ref="dropdownRef" class="relative inline-block w-full" :class="{ 'opacity-50 cursor-not-allowed': disabled }">
    <!-- Main dropdown button -->
    <button
      type="button"
      :disabled="disabled"
      :class="[
        'w-full flex items-center justify-between rounded-[4px] border border-gray-3 bg-white',
        sizeClasses,
        { 'ring-2 ring-blue-5': isOpen }
      ]"
      @click="toggleDropdown"
    >
      <span :class="{ 'text-gray-4': !selectedOption, 'text-gray-8': selectedOption }">
        {{ selectedOption ? selectedOption.label : (placeholder || 'Select...') }}
      </span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-5 w-5 ml-2 transition-transform duration-200" 
        :class="{ 'rotate-180': isOpen }"
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Dropdown panel -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto border border-gray-2"
      >
        <!-- Filter input -->
        <div v-if="filter" class="p-2 border-b border-gray-2">
          <input
            ref="filterInputRef"
            v-model="filterValue"
            type="text"
            class="w-full px-3 py-2 border border-gray-3 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-5"
            placeholder="Search..."
          />
        </div>

        <!-- Options list -->
        <ul class="py-1">
          <li
            v-for="(option, index) in filteredOptions"
            :key="index"
            :class="[
              'px-4 py-2 cursor-pointer hover:bg-gray-1',
              { 'text-gray-4': option.disabled, 'bg-blue-50': option.value === selectedValue && !option.disabled }
            ]"
            @click="selectOption(option)"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>