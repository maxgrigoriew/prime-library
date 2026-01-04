import { onMounted, onUnmounted, ref } from 'vue';

export const useCheckDevice = (width = 768) => {
    const isMobile = ref(false);

    const check = () => {
        isMobile.value = window.innerWidth < width;
    };

    onMounted(() => {
        check();
        window.addEventListener('resize', check);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', check);
    });

    return isMobile; // Возвращаем ref напрямую
};