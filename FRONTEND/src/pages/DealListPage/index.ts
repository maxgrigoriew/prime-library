import {ROUTE_NAMES} from "../../router/route.names.ts";
import DealListPage from "../DealListPage/DealListPage.vue";
import type {RouteForAdd} from '../../router/types'
import {AppLayout} from "../../entities/layout/ui/types.ts";

export const dealListPage: RouteForAdd = {
    path: '/deals',
    name: ROUTE_NAMES.DEAL_LIST_PAGE,
    component: DealListPage,
    meta: {
        layout: AppLayout.Main
    },
}