import {bindRequest} from "../../../../shared/api/doRequest.ts";

const doRequest = bindRequest('/api/todo/')

export async function removeTodo (id: number): Promise<any> {
    const data = await doRequest('remove', {id})

    return data
}