import {bindRequest} from "../../../../shared/api/doRequest.ts";
import type {TodoMark} from "../../types/types.ts";

const doRequest = bindRequest('/api/todo/')

export async function markTodo(mark: TodoMark): Promise<any> {
    await doRequest('mark', mark)
}