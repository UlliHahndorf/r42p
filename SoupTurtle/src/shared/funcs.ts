import React from "react";

var cl = window.console.log.bind(window.console);
export default cl;

export function DateFormat(dd: Date): string {
    return dd.toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
}
export function DateFormatString(ds: string): string {
    const dd = new Date(ds);
    return DateFormat(dd);
}

export function ToHtml(text: string): any {
    if (text === "") return "";
    const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
    return renderHTML(text.replace(/\n/g, "<br />"));
}

export function HttpHeaders(httpMethod: string): any {

    const defaultHttpHeaders = {
        "Access-Control-Request-Method": "any",     // value is void
        "Origin": "any",                            // value is void
    }
    let httpHeaders = {};

    switch (httpMethod.toUpperCase()) {
        case 'GET':
        case 'DELETE':
            httpHeaders = defaultHttpHeaders;
            break;
        case 'PUT':
        case 'POST':
            const extraHeaders = {
                'Content-Type': 'application/json'
            }
            Object.assign(httpHeaders, defaultHttpHeaders, extraHeaders);
            break;
    }
    return httpHeaders;
}
