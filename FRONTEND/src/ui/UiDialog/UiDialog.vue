<script setup lang="ts">
import type { DialogPosition, DialogSize } from './types'
import { computed, Teleport, onMounted, onUnmounted } from 'vue'

defineOptions({
  name: 'UiDialog'
})

type Props = {
  modelValue: boolean
  closable?: boolean
  modal?: boolean
  position?: DialogPosition
  size?: DialogSize
  closeOnEscape?: boolean
  dismissableMask?: boolean
  showHeader?: boolean
  draggable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closable: true,
  modal: true,
  position: 'center',
  size: 'md',
  closeOnEscape: true,
  dismissableMask: false,
  showHeader: true,
  draggable: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'after-hide': []
  'after-show': []
}>()

const showDialog = defineModel<boolean>('modelValue')

const closeDialog = () => {
  showDialog.value = false
  emit('after-hide')
}

const handleEscape = (event: KeyboardEvent) => {
  if (props.closeOnEscape && event.key === 'Escape') {
    closeDialog()
  }
}

const handleClickOutside = (event: Event) => {
  if (props.dismissableMask && event.target === event.currentTarget) {
    closeDialog()
  }
}

const dialogSizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'max-w-md'
    case 'lg':
      return 'max-w-3xl'
    case 'xl':
      return 'max-w-5xl'
    case 'full':
      return 'max-w-full inset-4'
    case 'md':
    default:
      return 'max-w-xl'
  }
})

const positionClass = computed(() => {
  switch (props.position) {
    case 'top':
      return 'mt-24'
    case 'bottom':
      return 'mb-24'
    case 'left':
      return 'ml-4'
    case 'right':
      return 'mr-4'
    case 'topleft':
      return 'mt-24 ml-4'
    case 'topright':
      return 'mt-24 mr-4'
    case 'bottomleft':
      return 'mb-24 ml-4'
    case 'bottomright':
      return 'mb-24 mr-4'
    case 'center':
    default:
      return 'inset-0'
  }
})

onMounted(() => {
  if (props.closeOnEscape) {
    document.addEventListener('keydown', handleEscape)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div 
        v-if="showDialog" 
        class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        :class="positionClass"
        @click="handleClickOutside"
      >
        <!-- Backdrop -->
        <div v-if="modal" class="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <!-- Dialog Container -->
        <div 
          class="relative bg-white rounded-lg shadow-xl w-full mx-4"
          :class="dialogSizeClass"
          @click.stop
        >
          <!-- Header -->
          <div v-if="showHeader" class="flex items-center justify-between p-6 border-b border-gray-200">
            <div class="font-semibold text-lg text-grey-8">
              <slot name="header">
                <span>{{ title }}</span>
              </slot>
            </div>
            <button 
              v-if="closable" 
              type="button" 
              class="text-gray-400 hover:text-grey-6 transition-colors duration-200"
              @click="closeDialog"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <slot />
          </div>
          
          <!-- Footer -->
          <div v-if="$slots.footer" class="p-6 border-t border-gray-200">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.3s ease;
}
.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>