import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {
  text?: string;
};

const Progress: React.FC<Props> = ({ text }) => {
  const { t } = useTranslation();

  if ((!text) || (text === "")) text = t('main.loading');

  return (
    <><CircularProgress /> <span>{text} ...</span></>
  );
};

export default Progress;
