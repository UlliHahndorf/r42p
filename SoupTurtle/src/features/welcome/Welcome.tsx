import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../shared/components/Icon';

const Welcome: React.FC = () => {
  const { t } = useTranslation();

  let content = (
    <>
      <Icon iconName='house' size='2x' /> <span className='title'>{t('menu.start')}</span>
    </>
  );

  return content
};

export default Welcome;
