import i18n  from '../i18n';

export { default as cl } from '../funcs.ts';
export { DateFormat, DateFormatString, ToHtml } from '../funcs.ts';
export { default as i18n } from '../i18n';

export { default as Icon } from './Icon';
export { default as Progress } from './Progress';
export { default as Feedback } from './Feedback';
export { default as NotFound } from './NotFound';
export { default as ConfirmDialog } from './ConfirmDialog';

export function HasEnglishUi() : boolean  {
    return (i18n.language === 'en')
}

