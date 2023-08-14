import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import dayjs from 'dayjs';
import 'dayjs/locale/de'
import 'dayjs/locale/en'

import deMessages from 'devextreme/localization/messages/de.json';
import enMessages from 'devextreme/localization/messages/en.json';
import { locale, loadMessages } from "devextreme/localization";

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();

  function postChangeLanguage(_error: any, _t: TFunction<'translation', undefined>): void {
    // DayJS
    dayjs.locale(i18n.language);
    // DevExtreme
    loadMessages(deMessages);
    loadMessages(enMessages);
    locale(i18n.language);
  }

  return (
    <div style={{ position: 'absolute', textAlign: 'right', top: 5, right: 5, paddingTop: 5, paddingRight: 30 }}>
      <Button
        variant="contained"
        disabled={i18n.language === 'de'}
        onClick={() => i18n.changeLanguage('de', postChangeLanguage)}
        className="btnLangSwitch"
        >
        Deutsch
      </Button>

      <Button
        variant="contained"
        disabled={i18n.language === 'en'}
        onClick={() => i18n.changeLanguage('en', postChangeLanguage)}
        className="btnLangSwitch"
      >
        English
      </Button>
    </div>
  );
};

export default LanguageSwitch;
