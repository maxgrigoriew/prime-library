import type {DataState} from "@/shared/dataState";

export type DefaultDataListReqt<T> = {
    sortColumn: string
    currentPage: number
    sortAscent: boolean
    showPerPage: number
    params: T // расписать
}

export type DefaultDataList<List> = {
    currentPage: number
    showPerPage: number
    itemCount: number
    pageCount: number
    list: List[]
    state: DataState
    filters?: List // оменять
}

export type InitialDataListProps = {
    initialList: any[]
    currentPage: number
    showPerPage: number
    itemCount: number
    pageCount: number
    filters: any
    state: DataState
}