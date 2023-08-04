import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Common from '../../shared/components/Common';

const WeekPlan: React.FC = () => {
  const { t } = useTranslation();

  let content = (
    <>
      <Common.Icon name='plate-utensils' size='2x' /> <span className='title'>{t('menu.week')}</span>
      <div className='jumbo'>
          <Common.Icon name='gear-complex' size='6x' isAnimSpin={true} />
      </div>
    </>
  );

  return content
};

export default WeekPlan;
