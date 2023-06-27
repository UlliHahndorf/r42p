import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  const { t } = useTranslation();
  let content = (
    <>
    <h1>{t('main.title')}</h1>
    <Link to={'/Recipes/List'}>{t('menu.recipes')}</Link>
    </>
  );

  return content
};

export default Welcome;
