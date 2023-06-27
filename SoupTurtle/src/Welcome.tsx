import React from 'react';
import { useTranslation } from 'react-i18next';

const Welcome: React.FC = () => {
  const { t } = useTranslation();
  return <h1>{t('main.title')}</h1>;
};

export default Welcome;
