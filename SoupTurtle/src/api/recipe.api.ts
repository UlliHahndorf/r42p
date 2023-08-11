import axios from 'axios';

import { Recipe, CreateRecipe } from '../shared/types/Recipe';
import { HttpConfig } from '../shared/funcs';

// LOAD (GET)
export async function loadRecipes(): Promise<Recipe[]>  {
  let res = [] as Recipe[];
  await axios.get(import.meta.env.VITE_BACKEND_URL + '/recipes/', HttpConfig)
             .then(function(response) {
               res = response.data;
             })
             .catch (function(error: any) {
               console.error("loadRecipes: Response not OK",error);
             })
             .finally (function() {
               // run anyways
             })
  
  return res;
};

export async function loadRecipesOld(): Promise<Recipe[]> {
  console.log("loadRecipes");
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/recipes/');
  if (!response.ok) {
    throw new Error('Response not OK');
  }
  return response.json();
}

// DELETE (DELETE)
export async function removeRecipe(id: number): Promise<void> {
  const response = await fetch(
    import.meta.env.VITE_BACKEND_URL + '/recipes/' + id,
    { method: 'DELETE' }
  );

  if (!response.ok) {
    throw new Error('Response not OK');
  }
}

// CREATE (POST)
// UPDATE (PUT)
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
