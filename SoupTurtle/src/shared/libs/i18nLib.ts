import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import dayjs from 'dayjs';
import 'dayjs/locale/de'
import 'dayjs/locale/en'

import deMessages from 'devextreme/localization/messages/de.json';
import enMessages from 'devextreme/localization/messages/en.json';
import { locale, loadMessages } from "devextreme/localization";

export function SetLanguage(lang: string) {
  // DayJs
  dayjs.locale(lang);
  // DevExtreme
  loadMessages(deMessages);
  loadMessages(enMessages);
  locale(lang);
}

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    debug: false,
    lng: 'de',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    backend: { loadPath: '/locales/{{lng}}.json' },
  });

export default i18n;
