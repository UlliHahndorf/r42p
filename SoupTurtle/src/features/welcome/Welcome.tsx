import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../shared/components/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import *  as faIcon from '@fortawesome/pro-light-svg-icons';

const Welcome: React.FC = () => {
  const { t } = useTranslation();

  let content = (
    <>
      <h1>{t('main.title')}</h1>
      <Icon iconName='Heart' />
      <FontAwesomeIcon icon={faIcon.faHeart} />
    </>
  );

  return content
};

export default Welcome;
