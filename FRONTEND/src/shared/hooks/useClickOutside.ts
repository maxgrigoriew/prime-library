import { ref, onMounted, onUnmounted, type Ref } from 'vue';

export interface UseClickOutsideOptions {
  isActive?: Ref<boolean>;
  onOutsideClick?: () => void;
}

export function useClickOutside(
  elementRef: Ref<HTMLElement | null | undefined>,
  options: UseClickOutsideOptions = {}
) {
  const { isActive = ref(true), onOutsideClick } = options;

  const handleClickOutside = (event: MouseEvent) => {
    if (!isActive.value) return;

    const element = elementRef.value;
    if (element && !element.contains(event.target as Node)) {
      onOutsideClick?.();
    }
  };

  const setup = () => {
    document.addEventListener('click', handleClickOutside);
  };

  const cleanup = () => {
    document.removeEventListener('click', handleClickOutside);
  };

  onMounted(() => {
    setup();
  });

  onUnmounted(() => {
    cleanup();
  });

  return {
    setup,
    cleanup,
    handleClickOutside
  };
}