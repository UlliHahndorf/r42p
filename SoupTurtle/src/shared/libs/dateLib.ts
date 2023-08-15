import dayjs from 'dayjs';
import 'dayjs/locale/de'
import 'dayjs/locale/en'

export function DateFormat(dd: Date): string {  
    return dayjs(dd).format('l');
}
export function DateFormatString(ds: string): string {
    return DateFormat(new Date(ds));
}
