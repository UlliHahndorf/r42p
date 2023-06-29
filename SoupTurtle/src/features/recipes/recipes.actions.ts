import { createAsyncAction } from 'typesafe-actions';
import { Recipe, CreateRecipe } from '../../shared/types/Recipe';

export const loadAction = createAsyncAction(
  'recipes/load/pending',
  'recipes/load/fulfilled',
  'recipes/load/rejected'
)<void, Recipe[], void>();

export const removeAction = createAsyncAction(
  'recipes/remove/pending',
  'recipes/remove/fulfilled',
  'recipes/remove/rejected'
)<number, number, void>();

export const saveAction = createAsyncAction(
  'recipes/save/pending',
  'recipes/save/fulfilled',
  'recipes/save/rejected'
)<CreateRecipe, Recipe, void>();
