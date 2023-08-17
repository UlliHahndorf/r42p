import { Recipe, CreateRecipe } from '../shared/types/Recipe';
import { HttpHeaders } from '../shared/libs/httpLib';

const baseUrl = import.meta.env.VITE_BACKEND_URL + '/recipes';

// LOAD (GET)
export async function loadRecipe(id: number): Promise<Recipe> {
  const url: string = baseUrl + '/' + id;
  const response = await fetch(url, { method: 'GET', headers: HttpHeaders("GET") });
  if (!response.ok) {
    throw new Error('Unable to load');
  }
  return response.json();
}
// LIST (GET)
export async function loadRecipes(): Promise<Recipe[]> {
  const url: string = baseUrl + '/';
  const response = await fetch(url, { method: 'GET', headers: HttpHeaders("GET") });
  if (!response.ok) {
    throw new Error('Unable to load');
  }
  return response.json();
}

// CREATE (POST)
// UPDATE (PUT)
export async function saveRecipe(recipe: CreateRecipe): Promise<Recipe> {
  let url: string = baseUrl;
  let verb = 'POST';
  if (recipe.id) {
    url += `/${recipe.id}`;
    verb = 'PUT';
  }
  const response = await fetch(url, { method: verb, headers: HttpHeaders(verb), body: JSON.stringify(recipe) });

  if (!response.ok) {
    throw new Error('Unable to save');
  }

  const data = await response.json();
  return data;
}

// DELETE (DELETE)
export async function removeRecipe(id: number): Promise<void> {
  const url: string = baseUrl + '/';
  const response = await fetch(url + id, { method: 'DELETE', headers: HttpHeaders("DELETE") }
  );

  if (!response.ok) {
    throw new Error('Unable to delete');
  }
}
