import {computed, ref} from 'vue'
import {AUTH_API} from "../api";

const session = ref(null)

const userLogin = ref('')
const userPassword = ref('')

const firstName = computed(() => session.value?.lastName)
const shortName = computed(() => session.value?.firstName[0] + ' ' + session.value?.lastName[0])

const setSession = (data) => {
    session.value = data
}

export const useLogin = () => {

    const login = async (reqt) => {
        try {
            await AUTH_API.login(reqt)
        } catch(error) {
            console.log(error)
        }
    }

    const logout = async () => {
        try {
            await AUTH_API.logout()
            await getSession()
        } catch (error) {
            console.log(error)
        }
    }


    const getSession = async () => {
        try {
            const {result} = await AUTH_API.sessionCheck()
            setSession(result)
            /*TODO: поместить в стор и удалить return и в router.beforeEach брать данные из стора   */
        } catch(error) {
            console.log(error)
        }

    }

    return {
        userLogin,
        userPassword,
        firstName,
        shortName,
        session,

        getSession,
        login,
        logout
    }
}