import {bindRequest} from "../../../../shared/api/doRequest.ts";

const doRequest = bindRequest('/api/deal/search')

export async function getDeals (): Promise<any> {
    const data = await doRequest('')

    return data
}