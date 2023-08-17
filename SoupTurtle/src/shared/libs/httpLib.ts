export function HttpHeaders(httpMethod: string): any {

    const defaultHttpHeaders = {
        "Access-Control-Request-Method": "any",     // value is void
        "Origin": "any",                            // value is void
    }
    let httpHeaders = {};

    switch (httpMethod.toUpperCase()) {
        case 'GET':
        case 'DELETE': {
            httpHeaders = defaultHttpHeaders;
            break;
        }
        case 'PUT':
        case 'POST': {
            const extraHeaders = {
                'Content-Type': 'application/json'
            }
            Object.assign(httpHeaders, defaultHttpHeaders, extraHeaders);
            break;
        }
    }
    return httpHeaders;
}
