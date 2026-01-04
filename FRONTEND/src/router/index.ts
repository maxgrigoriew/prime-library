import {createRouter, createWebHistory} from "vue-router";
import type {RouteForAdd} from "./types"
import {mainPage} from "../pages/MainPage";
import {taskPage} from "../pages/TaskPage";
import {dealPage} from "../pages/DealPage";
import {loginPage} from "../pages/LoginPage";

const routes: RouteForAdd[] = [
    loginPage,
    mainPage,
    taskPage,
    dealPage
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
});