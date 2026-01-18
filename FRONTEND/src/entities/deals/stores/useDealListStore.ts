import type {DefaultDataList} from "@/shared/DefaultData/list/types.ts";
import type {Deal} from "@/entities/deals/types/types.ts";
import {createGlobalState} from "@vueuse/core";
import {reactive} from "vue";
import {getDefaultDataList} from "@/shared/DefaultData/list/constants.ts";
import type {DataState} from "@/shared/dataState";

type DealListData = DefaultDataList<Deal, {}>

export type DealListStoreReturnShape = {
    dealListData: DealListData
    setDealListData: (deals: Deal[]) => void
    setDealListState: (state: DataState) => void
}

export const useDealListStore = createGlobalState((): DealListStoreReturnShape => {
    const dealListData: DealListData = reactive<DealListData>(getDefaultDataList())
    const setDealListData = (list: Deal[]): void => {
        dealListData.list = list
        console.log('dealListData', dealListData)
        const res = dealListData.list[0]
        console.log('res', res)
    }

    const setDealListState = (state: DataState) => {
        dealListData.state = state
    }

    return {
        dealListData,

        setDealListState,
        setDealListData
    }
})