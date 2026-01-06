// export type ApiResponse = {
//     ok: boolean;
//     status: number;
//     data: {
//         errorCode?: string;
//         errorText?: string;
//     };
// }

export interface ApiRequestOptions {
    method?: string;
    headers?: Record<string, string>;
    timeout?: number | null;
    signal?: AbortSignal;
}

export type ApiResponse<T = any> = {
    data: T | null;
    error: Error | null;
    status: number | null;
    ok: boolean;
}