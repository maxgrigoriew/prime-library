import {useDealList, type UseDealListReturnShape} from "@/entities/deals/hooks/useDealList.ts";

type ReturnShape = Pick<UseDealListReturnShape, 'dealListData'> & {
    loadDealList: () => Promise<void>
}
const {dealListData, getDealList} = useDealList()

export const dealListFeature = (): ReturnShape => {

    const loadDealList = async () => {
        try {

            await getDealList()
        } catch (e) {
            console.log('error')
        }
    }

    return {
        dealListData,
        loadDealList
    }
}