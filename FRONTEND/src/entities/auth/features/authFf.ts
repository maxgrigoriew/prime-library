import {useLogin} from "../hooks/useLogin.ts";

import {useRouter} from "vue-router";

const {
    userLogin,
    userPassword,
    firstName,
    shortName,
    session,
    login,
    logout,
    getSession
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
            await loadSession()
            router.push('/')

        } catch (error) {
            console.log('error', error)
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

    const loadSession = async () => {
        try {
            await getSession()
        } catch (error) {
            console.log(error)
        }
    }

    return {
        session,
        userLogin,
        userPassword,
        shortName,
        firstName,
        loadMyProfile,
        closeMyProfile,
        loadSession
    }
}