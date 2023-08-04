
var cl = window.console.log.bind(window.console);
export default cl;

export function DateFormat(dd: Date): string  {
    return dd.toLocaleDateString('de-DE', {year: 'numeric', month: '2-digit', day:'2-digit'});
}
export function DateFormatString(ds: string): string  {
    const dd = new Date(ds);
    return DateFormat(dd);
}

