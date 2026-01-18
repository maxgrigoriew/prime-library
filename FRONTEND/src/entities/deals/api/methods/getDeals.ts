import {bindRequest} from "../../../../shared/api/doRequest.ts";

const doRequest = bindRequest('/api/deal/search')

export async function getDeals (reqt: DealListReqt): Promise<any> {
    const data = await doRequest('', reqt)
    return data
}