import type {RouteRecordRaw, RouteRecordSingleView} from "vue-router";

type RouteMeta = Partial<{
    layout: string
}>

export type RouteForAdd = (RouteRecordSingleView | RouteRecordRaw) & { meta?: RouteMeta }
