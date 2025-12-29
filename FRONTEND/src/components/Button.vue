<template>
  <button
    :class="[
      'px-4 py-2 rounded font-medium transition-colors duration-200',
      {
        'bg-blue-600 hover:bg-blue-700 text-white': variant === 'primary',
        'bg-gray-200 hover:bg-gray-300 text-gray-800': variant === 'secondary',
        'bg-red-600 hover:bg-red-700 text-white': variant === 'danger',
        'bg-green-600 hover:bg-green-700 text-white': variant === 'success',
        'text-blue-600 hover:bg-blue-100': variant === 'text',
        'text-sm': size === 'small',
        'text-base': size === 'medium',
        'text-lg': size === 'large',
        'px-2 py-1': size === 'small',
        'px-6 py-3': size === 'large',
        'opacity-50 cursor-not-allowed': disabled,
      }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style scoped>
/* Component-specific styles can go here if needed */
</style>