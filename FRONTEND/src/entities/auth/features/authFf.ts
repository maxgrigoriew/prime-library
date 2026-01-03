import {useLogin} from "../hooks/useLogin.ts";

const { login, user } = useLogin()

export const authFt = () => {

    const getUser = async () => {
        try {
            await login({
                email: 'khlopyanik@ural.ru',
                password: '12345'
            })

        } catch (error) {
            console.log('error', error)
            return Promise(error)
        }
    }

    return {
        getUser,
        user
    }
}