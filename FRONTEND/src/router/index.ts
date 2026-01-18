import {createRouter, createWebHistory} from "vue-router";
import type {RouteForAdd} from "./types"
import {mainPage} from "../pages/MainPage";
import {taskPage} from "../pages/TaskPage";
import {dealPage} from "../pages/DealPage";
import {loginPage} from "../pages/LoginPage";
import {authFt} from "../entities/auth/features/authFf.ts";
import {dealListPage} from "@/pages/DealListPage";

const routes: RouteForAdd[] = [
    loginPage,
    mainPage,
    taskPage,
    dealListPage,
    dealPage
]

const {session, loadSession} = authFt()

export const createNewRouter = () => {
    const router = createRouter({
        history: createWebHistory(),
        routes,
    });

    router.beforeEach(async (to, from, next) => {
        await loadSession()

        /* если не авторизован и ввожу любой роут кроме login, то меня редиректит на login */
        if (!session.value?.id && to.path !== '/login') {
            next('/login')
            return;
        }

        // когда авторизован, но не могу попасть на страницу login
        if (session.value?.id && to.path === '/login') {
            console.log('two')
            next('/')
            return
        }

        next()
    })

    return router
}