import {apiRequest} from "../../../../shared/api/apiRequest.ts";

export async function sessionCheck (): Promise<any> {
    const {data} = await apiRequest('api/user/session/' + 'check')
    return data
}