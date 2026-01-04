const NO_BODY_METHODS = new Set([ 'HEAD', 'GET' ]);

function dontOverwriteBody(body) {
    return (typeof(body) === 'string'
        || body instanceof Blob
        || body instanceof File
        || body instanceof FormData
        || body instanceof URLSearchParams
        || body instanceof ArrayBuffer
        || ArrayBuffer.isView(body)
    );
}

export async function request(url, body = {}, opts = {}) {
    console.log('start')
    if (typeof(url) !== 'string')
        throw new TypeError('Parameter #1:url is not a string');

    if (body != null && typeof(body) !== 'object')
        throw new TypeError('Parameter #2:body is not an object');

    if (opts == null || typeof(opts) !== 'object')
        throw new TypeError('Parameter #3:opts is not an object');

    const request = {
        method:   'POST',
        blocking: true,
        messages: true,
        headers:  {},
        ...opts,
    };

    request.method = request.method.toUpperCase();

    if (request.params) {
        url+= url.includes('?') ? '&' : '?';
        url+= new URLSearchParams(request.params);
    }

    request.url = url;

    if (NO_BODY_METHODS.has(request.method)) {
        request.body = null;
    } else
    if (dontOverwriteBody(body)) {
        request.body = body;
    } else {
        request.body = JSON.stringify(body);
        request.headers['Content-Type'] = 'application/json;charset=utf-8';
    }

    let spinner = null;

    // if (request.blocking) {
    //     spinner.open();
    // }

    let response;
    let error;
    let data;

    try {
        console.log('request', request)
        response = await fetch(url, request);
        console.log('response', response);
        data = await response.json();

        if (typeof (data) !== 'object')
            throw new Error('Некорректный ответ сервиса');

        if (data.errorCode === 'error.NotAuthorizedException') {
            if (window.location.pathname === '/user/login')
                return;

            window.location.href = '/user/login?redirect=' + window.location.pathname;

        } else if (data.errorCode) {
            throw new Error(data.errorText);
        }

        console.log('data', data)
        return data;

    } catch (e) {
        error = e;
        error.response = response;

        console.debug('an error occurred ' + e.message
            + '; status code: ' + response.status
            + '; response data: ' + data);

    } finally {
        if (spinner)
            spinner.close();
    }

    throw error;
}