import {apiRequest} from "../../../../shared/api/apiRequest.ts";
import {BASE_URL} from "../index.ts";
export async function getTodos (): Promise<any> {
    const {data} = await apiRequest(BASE_URL + '/loadList', {})

    return data
}