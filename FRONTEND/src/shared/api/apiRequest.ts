import {HOST} from "./constants.ts";

export interface ApiRequestOptions {
    method?: string;
    headers?: Record<string, string>;
    timeout?: number | null;
    signal?: AbortSignal;
}

export interface ApiResponse<T = any> {
    data: T | null;
    error: Error | null;
    status: number | null;
    ok: boolean;
}

export const apiRequest = async <T = any>(
    url: string,
    body: any = null,
    options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> => {
    const path = HOST + url;

    const {
        method = 'POST',
        headers = {},
        timeout = 30_000,
        signal: externalSignal,
    } = options;

    // Формируем заголовки
    const requestHeaders: HeadersInit = {
        ...headers,
    };

    if (body !== null && !(body instanceof FormData) && !headers['Content-Type']) {
        requestHeaders['Content-Type'] = 'application/json';
    }

    // Тело запроса
    const requestBody =
        body instanceof FormData
            ? body
            : body !== null
                ? JSON.stringify(body)
                : null;

    // Контроллер для тайм‑аута
    const controller = externalSignal ? null : new AbortController();
    const requestSignal = externalSignal || controller?.signal;

    let timeoutId: NodeJS.Timeout | undefined;

    if (timeout !== null && controller) {
        timeoutId = setTimeout(() => controller.abort(), timeout);
    }

    try {
        const response = await fetch(path, {
            method,
            body: requestBody,
            headers: requestHeaders,
            signal: requestSignal,
        });

        if (timeoutId) clearTimeout(timeoutId);

        // Парсим JSON
        let data: T | null = null;
        try {
            data = await response.json();
        } catch (parseError) {
            // Если ответ не JSON, оставляем data = null
        }

        return {
            data,
            error: null,
            status: response.status,
            ok: response.ok,
        };
    } catch (error) {
        if (timeoutId) clearTimeout(timeoutId);

        const isAbortError = error instanceof DOMException && error.name === 'AbortError';
        const message = isAbortError
            ? 'Request timed out'
            : error instanceof Error
                ? error.message
                : 'Unknown error';

        return {
            data: null,
            error: new Error(message),
            status: null,
            ok: false,
        };
    }
};
