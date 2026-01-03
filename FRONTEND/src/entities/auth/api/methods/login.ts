import {apiRequest} from "../../../../shared/api/apiRequest.ts";
import {BASE_URL} from "../index.ts";
export async function login (reqt): Promise<any> {
    const {data} = await apiRequest(BASE_URL + 'login', reqt)

    return data
}