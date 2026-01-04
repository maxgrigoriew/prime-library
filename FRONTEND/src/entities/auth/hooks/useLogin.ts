import {computed, ref} from 'vue'
import {AUTH_API} from "../api";

const user = ref(null)

const firstName = computed(() => user.value?.lastName)
const shortName = computed(() => user.value?.firstName[0] + ' ' + user.value?.lastName[0])

const setUser = (data) => {
    user.value = data
}

export const useLogin = () => {

    const login = async (reqt) => {
        const { result } = await AUTH_API.login(reqt)

        setUser(result)

        console.log('user', user.value)
    }


    return {
        firstName,
        shortName,
        login
    }
}