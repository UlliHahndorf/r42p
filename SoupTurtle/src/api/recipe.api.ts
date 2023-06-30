import { Recipe, CreateRecipe } from '../shared/types/Recipe';

export async function loadRecipes(): Promise<Recipe[]> {
  console.log("loading fetch");
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/recipes');
  if (!response.ok) {
    throw new Error('Response not OK');
  }
  return response.json();
}

export async function removeRecipe(id: number): Promise<void> {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + '/recipes/' + id,
    { method: 'DELETE' }
  );

  if (!response.ok) {
    throw new Error('Response not OK');
  }
}
export async function saveRecipe(recipe: CreateRecipe): Promise<Recipe> {
  let url = `${import.meta.env.VITE_BACKEND_URL}/recipes`;
  let method = 'POST';
  if (recipe.id) {
    url += `/${recipe.id}`;
    method = 'PUT';
  }
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error('Unable to save');
  }

  const data = await response.json();
  return data;
}
