import {bindRequest} from "../../../../shared/api/doRequest.ts";

const doRequest = bindRequest('api/user/session/')
export async function login (reqt): Promise<any> {
    const {data} = await doRequest('login', ...reqt)

    return data
}