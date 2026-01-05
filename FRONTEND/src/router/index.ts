import {createRouter, createWebHistory} from "vue-router";
import type {RouteForAdd} from "./types"
import {mainPage} from "../pages/MainPage";
import {taskPage} from "../pages/TaskPage";
import {dealPage} from "../pages/DealPage";
import {loginPage} from "../pages/LoginPage";
import {sessionCheck} from "../entities/auth/api/methods/sessionCheck.ts";

const routes: RouteForAdd[] = [
    loginPage,
    mainPage,
    taskPage,
    dealPage
]

export const createNewRouter = () => {
    const router = createRouter({
        history: createWebHistory(),
        routes,
    });
    console.log('router', router)

    router.beforeEach(async (to, from, next) => {
        const {result} = await sessionCheck()
        /* если не авторизован и ввожу любой роут кроме login, то меня редиректит на login */
        if (!result.id && to.path !== '/login') {
            next('/login')
            return;
        }

        // когда авторизован, но не могу попасть на страницу login
        if (result.id && to.path === '/login') {
            console.log('two')
            next('/')
            return
        }

        next()
    })

    return router
}