import {bindRequest} from "../../../../shared/api/doRequest.ts";
import type {Deal} from "@/entities/deals/types/types.ts";

const doRequest = bindRequest('/api/todo/')

export async function getTodos (reqt: Deal): Promise<any> {
    const {data} = await doRequest('loadList', reqt)

    return data
}