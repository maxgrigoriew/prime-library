import {bindRequest} from "../../../../shared/api/doRequest.ts";
import type {NewTodo} from "../../types/types.ts";

const doRequest = bindRequest('/api/todo/')

export async function sendNewTodo (todo: NewTodo): Promise<any> {
    const data = await doRequest('save', todo)

    return data
}