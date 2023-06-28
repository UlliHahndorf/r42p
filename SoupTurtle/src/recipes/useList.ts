import { useState, useEffect, ChangeEvent } from 'react';
import { Recipe } from '../shared/types/Recipe';
import { useRecipesContext } from '../recipes/Context';
import { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import { getRecipes, removeRecipe } from '../api/recipe.api';

type UseListReturnType = [
  recipes: Recipe[],
  filter: string,
  orderValue: string,
  error: string,
  handleDelete: (id: number) => Promise<void>,
  handleFilterChange: (event: ChangeEvent<HTMLInputElement>) => void,
  handleOrderChange: (event: SelectChangeEvent) => void
];

export default function useList(): UseListReturnType {
  const [recipes, dispatch] = useRecipesContext();
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [orderValue, setOrder] = useState('');

  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch({ type: 'FETCH' });
  }, []);
  
  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  }, [error]);
  
  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value);
  }
  
  function handleOrderChange(event: SelectChangeEvent) {
    setOrder(event.target.value);
  }
  
  async function handleDelete(id: number): Promise<void> {
    if (confirm(t('recipes.delete') + '?')) {
      removeRecipe(id);
    }
  }

  return [recipes, filter, orderValue, error, handleDelete, handleFilterChange, handleOrderChange];
}
