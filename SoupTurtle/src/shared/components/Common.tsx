import i18n  from '../libs/i18nLib.ts';

export { default as cl } from '../libs/debugLib.ts';
export { DateFormat, DateFormatString } from '../libs/dateLib.ts';
export { StringToHtml } from '../libs/stringLib.ts';
export { default as i18n, SetLanguage } from '../libs/i18nLib.ts';

export { default as Icon } from './Icon';
export { default as Progress } from './Progress';
export { default as Feedback } from './Feedback';
export { default as NotFound } from './NotFound';
export { default as ConfirmDialog } from './ConfirmDialog';

export function HasEnglishUi() : boolean  {
    return (i18n.language === 'en')
}

