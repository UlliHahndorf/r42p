import React from "react";

export function StringToHtml(text: string): any {
    if (text === "") return "";
    const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
    return renderHTML(text.replace(/\n/g, "<br />"));
}
