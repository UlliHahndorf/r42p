import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../shared/components/Icon';

const WeekPlan: React.FC = () => {
  const { t } = useTranslation();

  let content = (
    <>
      <Icon name='plate-utensils' size='2x' /> <span className='title'>{t('menu.week')}</span>
      <div className='jumbo'>
          <Icon name='gear-complex' size='6x' isAnimSpin={true} />
      </div>
    </>
  );

  return content
};

export default WeekPlan;
