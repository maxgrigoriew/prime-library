import {bindRequest} from "../../../../shared/api/doRequest.ts";

const doRequest = bindRequest('/api/todo/')

export async function getTodos (): Promise<any> {
    const {data} = await doRequest('loadList')

    return data
}