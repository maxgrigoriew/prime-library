<template>
  <Story title="UiDropdown" :layout="{ type: 'grid', width: 'min-content' }">
    <Variant title="Basic Dropdown">
      <div class="w-64">
        <UiDropdown 
          v-model="basicValue" 
          :options="options" 
          placeholder="Select an option"
        />
      </div>
    </Variant>

    <Variant title="Dropdown with Pre-selected Value">
      <div class="w-64">
        <UiDropdown 
          v-model="preselectedValue" 
          :options="options" 
          placeholder="Select an option"
        />
      </div>
    </Variant>

    <Variant title="Filtered Dropdown">
      <div class="w-64">
        <UiDropdown 
          v-model="filteredValue" 
          :options="longOptions" 
          placeholder="Search options"
          :filter="true"
        />
      </div>
    </Variant>

    <Variant title="Disabled Dropdown">
      <div class="w-64">
        <UiDropdown 
          :options="options" 
          placeholder="Disabled dropdown"
          :disabled="true"
        />
      </div>
    </Variant>

    <Variant title="Small Dropdown">
      <div class="w-64">
        <UiDropdown 
          v-model="smallValue" 
          :options="options" 
          placeholder="Small dropdown"
          size="sm"
        />
      </div>
    </Variant>

    <Variant title="Large Dropdown">
      <div class="w-64">
        <UiDropdown 
          v-model="largeValue" 
          :options="options" 
          placeholder="Large dropdown"
          size="lg"
        />
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UiDropdown from '@/ui/UiDropdown/UiDropdown.vue'

const basicValue = ref(null)
const preselectedValue = ref('option2')
const filteredValue = ref(null)
const smallValue = ref(null)
const largeValue = ref(null)

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' }
]

const longOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
  { label: 'Honeydew', value: 'honeydew' }
]
</script>