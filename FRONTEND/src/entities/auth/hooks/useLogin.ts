import {ref} from 'vue'
import {AUTH_API} from "../api";

const user = ref(null)
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
        login,
        user
    }
}