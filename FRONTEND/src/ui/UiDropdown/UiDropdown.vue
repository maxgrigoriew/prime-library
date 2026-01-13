<script setup lang="ts">
import type { DropdownOption, DropdownSize } from './types'
import {computed, ref, nextTick, onMounted, onUnmounted} from 'vue'
import {DROPDOWN_CLASS_BY_SIZE} from "@/ui/UiDropdown/constants.ts";

defineOptions({
  name: 'UiDropdown'
})

type Props = {
  options: DropdownOption[]
  placeholder?: string
  isDisabled?: boolean
  isFilter?: boolean
  size: DropdownSize
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  isDisabled: false,
  isFilter: true,
})

const selectedValue = defineModel<string>()

const isOpen = ref(false)
const filterValue = ref('')
const dropdownRef = ref<HTMLElement>()
const filterInputRef = ref<HTMLInputElement>()

const filteredOptions = computed(() => {
  if (!props.isFilter || !filterValue.value) {
    return props.options
  }

  return props.options.filter(option =>
    option.label.toLowerCase().includes(filterValue.value.toLowerCase())
  )
})

const selectedOption = computed(() => {
  return props.options.find(option => option.value === selectedValue.value) || null
})

const sizeClasses = computed(() => DROPDOWN_CLASS_BY_SIZE[props.size])

const toggleDropdown = () => {
  if (props.isDisabled) {
    return
  }
  if (!props.isDisabled) {
    isOpen.value = !isOpen.value

    if (isOpen.value && props.isFilter) {
      nextTick(() => {
        filterInputRef.value?.focus()
      })
    }
  }
}

const selectOption = (option: DropdownOption) => {
  if (option.disabled) {
    return
  }

  selectedValue.value = option.value
  isOpen.value = false
}

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as HTMLElement)) {
    isOpen.value = false
    filterValue.value = ''
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.addEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative inline-block w-full" :class="{ 'opacity-50 cursor-not-allowed': isDisabled }">
    <button
      type="button"
      :disabled="isDisabled"
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
      <i class="pi pi-chevron-down"></i>
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
        class="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto border border-gray-2"
      >
        <!-- Filter input -->
        <div v-if="isFilter" class="p-2 border-b border-gray-2">
          <input
            ref="filterInputRef"
            v-model="filterValue"
            type="text"
            class="w-full py-4 px-6 border border-gray-3 rounded-4 focus:outline-none focus:red focus:ring-blue-5"
            placeholder="Search..."
          />
        </div>

        <ul class="py-4">
          <li
            v-for="option in filteredOptions"
            :key="option.value"
            class="px-4 py-2 cursor-pointer hover:bg-gray-1"
            :class="[
              { 'text-gray-4': option.disabled, 'bg-gray-2': option.value === selectedValue && !option.disabled }
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