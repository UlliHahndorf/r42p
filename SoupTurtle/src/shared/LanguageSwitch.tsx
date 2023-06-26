import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div style={{ textAlign: 'right', paddingTop: 5, paddingRight: 30 }}>
      <Button
        variant="outlined"
        disabled={i18n.language === 'de'}
        onClick={() => i18n.changeLanguage('de')}
      >
        🇩🇪 DE
      </Button>
      <Button
        variant="outlined"
        disabled={i18n.language === 'en'}
        onClick={() => i18n.changeLanguage('en')}
      >
        🇬🇧 EN
      </Button>
    </div>
  );
};

export default LanguageSwitch;
