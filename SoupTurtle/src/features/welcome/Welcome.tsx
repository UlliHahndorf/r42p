import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Common from '../../shared/components/Common';
import { useAppDispatch } from '../../app/hooks';
import { load, selectRecipes } from '../recipes/recipesSlice';
import { useSelector } from 'react-redux';

const Welcome: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const recipes = useSelector(selectRecipes);

  useEffect(() => {
    dispatch(load());
  }, []);

  let content = (
    <>
      <Common.Icon name='house' size='2x' /> <span className='title'>{t('menu.start')}</span>
      <div>
        { recipes.length === 1
            ? t('recipes.list.filterResults_one', {count: recipes.length})
            : t('recipes.list.filterResults_other', {count: recipes.length})
        }
      </div>
    </>
  );

  return content
};

export default Welcome;
