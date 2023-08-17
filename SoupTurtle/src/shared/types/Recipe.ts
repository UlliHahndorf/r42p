export type Recipe = {
  id: number;
  title: string;
  ingredients: string;
  numberServings: string;
  quantities: string;
  instructions: string;
  dateCreated: Date;
  dateModified: Date;
  category: string;
  notes: string;
  description: string;
  price: number;
  pricePerLiter: number;
  factor: number;
  source: string;
  sourcePage: string;
};

export function DefaultRecipe(): Recipe {
  return {
    id: 0,
    title: '',
    ingredients: '',
    numberServings: '',
    quantities: '',
    instructions: '',
    dateCreated: new Date,
    dateModified: new Date,
    category: '',
    notes: '',
    description: '',
    price: 0,
    pricePerLiter: 0,
    factor: 0,
    source: '',
    sourcePage: '',
  }
}

export type CreateRecipe = Omit<Recipe, 'id'> & { id?: number };
