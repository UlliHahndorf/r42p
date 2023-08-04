import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Common from '../../shared/components/Common';

const Welcome: React.FC = () => {
  const { t } = useTranslation();

  let content = (
    <>
      <Common.Icon name='house' size='2x' /> <span className='title'>{t('menu.start')}</span>
    </>
  );

  return content
};

export default Welcome;
