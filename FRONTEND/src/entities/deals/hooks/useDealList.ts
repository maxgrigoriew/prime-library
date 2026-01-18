import {DEAL_API} from "@/entities/deals/api";
import {type DealListStoreReturnShape, useDealListStore} from "@/entities/deals/stores/useDealListStore.ts";
import {DataState} from "@/shared/dataState";

export type UseDealListReturnShape = Omit<DealListStoreReturnShape, 'setDealListState' | 'setDealListData'> & {
    getDealList: () => void
}
const {dealListData, setDealListData, setDealListState} = useDealListStore()

export const useDealList = (): UseDealListReturnShape => {
    const getDealList = async () => {
        try {
            setDealListState(DataState.Loading)
            const data = await DEAL_API.getDeals(
                {
                    "sortColumn": "",
                    "sortAscent": true,
                    "currentPage": 0,
                    "showPerPage": 10,
                    "params": {
                        "client": null,
                        "deal": null,
                        "managers": [
                            1
                        ],
                        "macroClients": [],
                        "created": null,
                        "stages": [],
                        "services": [],
                        "tender": null,
                        "plannedConclusion": null,
                        "actualConclusion": null,
                        "test": null,
                        "filters": [
                            "ALL"
                        ],
                        "clientDirections": [],
                        "managerDirections": [],
                        "period": null
                    }
                })
            setDealListData(data)
            console.log('data', data)
            setDealListState(DataState.Success)
        } catch (error) {
            console.log(error)
            setDealListState(DataState.Failed)
        }
    }

    return {
        dealListData,
        getDealList
    }
}