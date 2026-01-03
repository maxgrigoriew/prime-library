import {ROUTE_NAMES} from "../../router/route.names.ts";
import DealPage from "../DealPage/DealPage.vue";
import type {RouteForAdd} from '../../router/types'
import {AppLayout} from "../../entities/layout/ui/types.ts";

export const dealPage: RouteForAdd = {
    path: '/deals',
    name: ROUTE_NAMES.DEAL_PAGE,
    component: DealPage,
    meta: {
        layout: AppLayout.Main
    },
}