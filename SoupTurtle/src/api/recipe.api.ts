import { Recipe } from '../shared/types/Recipe';

export async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/Recipes');
  if (!response.ok) {
    throw new Error('Response not OK');
  }
  return response.json();
}

export async function removeRecipe(id: number): Promise<void> {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + '/Recipes/' + id,
    { method: 'DELETE' }
  );

  if (!response.ok) {
    throw new Error('Response not OK');
  }
}
