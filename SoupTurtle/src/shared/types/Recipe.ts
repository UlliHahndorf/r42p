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
  
  export type CreateRecipe = Omit<Recipe, 'id'> & { id?: number };
  
