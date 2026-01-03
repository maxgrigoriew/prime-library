import {apiRequest} from "../../../../shared/api/apiRequest.ts";
import {BASE_URL} from "../index.ts";

export async function sessionCheck (): Promise<any> {
    const {data} = await apiRequest(BASE_URL + 'check')
    return data.result
}