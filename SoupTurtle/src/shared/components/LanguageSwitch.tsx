import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div style={{ position: 'absolute', textAlign: 'right', top: 5, right: 5, paddingTop: 5, paddingRight: 30 }}>
      <Button
        variant="contained"
        disabled={i18n.language === 'de'}
        onClick={() => i18n.changeLanguage('de')}
        className="btnLangSwitch"
        >
        Deutsch
      </Button>

      <Button
        variant="contained"
        disabled={i18n.language === 'en'}
        onClick={() => i18n.changeLanguage('en')}
        className="btnLangSwitch"
      >
        English
      </Button>
    </div>
  );
};

export default LanguageSwitch;
