export type Recipe = {
    Id: number;
    Title: string;
    Ingredients: string;
    NumberServings: string;
    Quantities: string;
    Instructions: string;
    DateCreated: Date;
    DateModified: Date;
    Category: string;
    Notes: string;
    Description: string;
    Price: number;
    PricePerLiter: number;
    Factor: number;
    Source: string;
    SourcePage: string;
  };
  
  export type CreateRecipe = Omit<Recipe, 'Id'> & { Id?: number };
  
