import {onMounted, onUnmounted, ref} from "vue";

export const useCheckDevice = (width: number = 768) => {
    const isMobile = ref(false)

    const check = () => {
        isMobile.value = window.innerWidth < width
    }


    onMounted(() => {
        window.addEventListener('resize', check)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', check)
    })

    return isMobile
}