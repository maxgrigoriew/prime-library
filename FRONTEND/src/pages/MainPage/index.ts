import {ROUTE_NAMES} from "../../router/route.names.ts";
import MainPage from "./MainPage.vue";
import type {RouteForAdd} from '../../router/types'
import {AppLayout} from "../../entities/layout/ui/types.ts";

export const mainPage: RouteForAdd = {
    path: '/',
    name: ROUTE_NAMES.MAIN_PAGE,
    component: MainPage,
    meta: {
        layout: AppLayout.Main
    },
}