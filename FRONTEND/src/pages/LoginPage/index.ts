import {ROUTE_NAMES} from "../../router/route.names.ts";
import LoginPage from "./LoginPage.vue";
import type {RouteForAdd} from '../../router/types'
import {AppLayout} from "../../entities/layout/ui/types.ts";

export const loginPage: RouteForAdd = {
    path: '/login',
    name: ROUTE_NAMES.LOGIN_PAGE,
    component: LoginPage,
    meta: {
        layout: AppLayout.Login
    },
}