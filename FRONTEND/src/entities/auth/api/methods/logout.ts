import {bindRequest} from "../../../../shared/api/doRequest.ts";

const doRequest = bindRequest('api/user/session/')
export async function logout (): Promise<any> {
    const {data} = await doRequest('logout')

    return data
}