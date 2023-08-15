import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as Common from '../../shared/components/Common';
import { useAppDispatch } from '../../app/hooks';
import { load, selectRecipes } from '../recipes/recipesSlice';
import { useSelector } from 'react-redux';
import { DateFormat } from '../../shared/libs/dateLib.js'

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
      <div className="protRemarks">
        Der Count kommt per <b>REST</b> von <b>{import.meta.env.VITE_BACKEND_URL}</b>
      </div>
      <div>
        { recipes.length === 1
            ? t('recipes.list.filterResults_one', {count: recipes.length})
            : t('recipes.list.filterResults_other', {count: recipes.length})
        }
        &nbsp;
        ({ DateFormat(new Date()) })
      </div>
    </>
  );

  return content
};

export default Welcome;
