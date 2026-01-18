import type {DefaultDataList, InitialDataListProps} from "@/shared/DefaultData/list/types.ts";
import {DataState} from "@/shared/dataState";


export const getDefaultDataList = <DataType>(props?: Partial<InitialDataListProps>): DefaultDataList<DataType> => ({
    list: props?.initialList || [],
    currentPage: props?.currentPage || 0,
    showPerPage: props?.showPerPage || 0,
    itemCount: props?.itemCount || 0,
    pageCount: props?.pageCount || 0,
    filters: props?.filters,
    state: props?.state
})