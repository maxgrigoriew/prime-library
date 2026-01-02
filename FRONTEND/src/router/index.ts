import type {RouteForAdd} from "./types"
import {mainPage} from "../pages/MainPage";
import {createRouter, createWebHistory} from "vue-router";
import {taskPage} from "../pages/TaskPage";

const routes: RouteForAdd[] = [
    mainPage,
    taskPage
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
});