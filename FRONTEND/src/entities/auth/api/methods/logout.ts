import {apiRequest} from "../../../../shared/api/apiRequest.ts";
import {BASE_URL} from "../index.ts";

export async function logout (): Promise<any> {
    const {data} = await apiRequest(BASE_URL + 'logout')

    return data
}