import {useLogin} from "../hooks/useLogin.ts";
import {sessionCheck} from "../api/methods/sessionCheck.ts";
import {useRouter} from "vue-router";

const {
    userLogin,
    userPassword,
    firstName,
    shortName,
    login,
    logout
} = useLogin()

export const authFt = () => {
    const router = useRouter()

    const loadMyProfile = async () => {
        try {
            /* TODO: добавить в стор */
            const reqt = {
                email: userLogin.value,
                password: userPassword.value,
            }

            await login(reqt)

            await sessionCheck()

            router.push('/')


        } catch (error) {
            console.log('error', error)
            return error
        }
    }

    const closeMyProfile = async () => {
        try {
            await logout()

            router.push('/login')
            console.log('closeMe session')
        } catch(error) {
            console.log(error)
        }
    }

    return {
        userLogin,
        userPassword,
        shortName,
        firstName,
        loadMyProfile,
        closeMyProfile
    }
}