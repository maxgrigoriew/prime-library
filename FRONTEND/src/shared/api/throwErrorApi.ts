import type {ApiResponse} from "./types.ts";

export const throwErrorApi = (response: ApiResponse) => {
    if (!response.ok || (response.status !== null && response.status >= 400)) {
        const msg = response.data?.errorText || response.data?.errorCode || `HTTP ${response.status}`;
        throw new Error(msg);
    }
}