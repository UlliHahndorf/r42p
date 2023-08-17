import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { SetLanguage } from '../libs/i18nLib';

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function postChangeLanguage(_error: unknown, _t: TFunction<'translation', undefined>): void {
    //console.log(i18n.language);
    SetLanguage(i18n.language);
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
