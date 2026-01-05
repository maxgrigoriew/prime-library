import {useLogin} from "../hooks/useLogin.ts";

const {
    firstName,
    shortName,
    login,
    logout
} = useLogin()

export const authFt = () => {

    const loadMyProfile = async () => {
        try {
            await login({
                email: 'khlopyanik@ural.ru',
                password: '12345',
            })

        } catch (error) {
            console.log('error', error)
            return error
        }
    }

    const closeMyProfile = async () => {
        try {
            await logout()
            console.log('closeMe session')
        } catch(error) {
            console.log(error)
        }
    }

    return {
        shortName,
        firstName,
        loadMyProfile,
        closeMyProfile
    }
}