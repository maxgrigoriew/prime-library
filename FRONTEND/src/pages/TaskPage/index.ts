import {ROUTE_NAMES} from "../../router/route.names.ts";
import TaskPage from "./TaskPage.vue";
import type {RouteForAdd} from '../../router/types'
import {AppLayout} from "../../entities/layout/ui/types.ts";

export const taskPage: RouteForAdd = {
    path: '/tasks',
    name: ROUTE_NAMES.TASK_PAGE,
    component: TaskPage,
    meta: {
        layout: AppLayout.Main
    },
}