import {apiRequest} from "@/shared/api/apiRequest.ts";

export async function sessionCheck () {
    const {data} = await apiRequest('user/session/check')
    return data.result
}