import React from "react";

export function StringToHtml(text: string): "" | React.DetailedReactHTMLElement<{ dangerouslySetInnerHTML: { __html: string; }; }, HTMLElement> {
    if (text === "") return "";
    const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
    return renderHTML(text.replace(/\n/g, "<br />"));
}
