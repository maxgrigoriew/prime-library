import type {RouteForAdd} from "./types"
import {mainPage} from "../pages/MainPage";
import {createRouter, createWebHistory} from "vue-router";
import {taskPage} from "../pages/TaskPage";
import {dealPage} from "../pages/DealPage";

const routes: RouteForAdd[] = [
    mainPage,
    taskPage,
    dealPage
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
});