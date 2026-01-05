import {apiRequest} from "./apiRequest.ts";

export const bindRequest = (prefix: string) => {
    return (url: string, ...args: any[]) =>  apiRequest(prefix + url, ...args)
}