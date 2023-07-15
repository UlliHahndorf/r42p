import React from 'react';
import { useTranslation } from 'react-i18next';

const Welcome: React.FC = () => {
  const { t } = useTranslation();

  let content = (
    <>
      <h1>{t('main.title')}</h1>
    </>
  );

  return content
};

export default Welcome;
