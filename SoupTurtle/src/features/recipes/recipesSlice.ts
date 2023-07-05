import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { Recipe, CreateRecipe, DefaultRecipe } from '../../shared/types/Recipe';
import { loadRecipes, removeRecipe, saveRecipe } from '../../api/recipe.api';

type State = null | 'pending' | 'completed' | 'error';

type RecipesState = {
    recipes: Recipe[];
    loadState: State;
    removeState: State;
    saveState: State;
};

const initialState: RecipesState = {
    recipes: [],
    loadState: null,
    removeState: null,
    saveState: null,
};

export const load = createAsyncThunk('recipes/load',
    async (_obj, { rejectWithValue }) => {
        try {
            const recipes = await loadRecipes();
            return recipes;
        } catch (error) {
            rejectWithValue(error);
        }
    }
);

export const remove = createAsyncThunk('recipes/remove',
    async (id: number, { rejectWithValue }) => {
        try {
            await removeRecipe(id);
            return id;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const save = createAsyncThunk('recipes/save',
    async (recipe: CreateRecipe, { rejectWithValue }) => {
        try {
            const data = await saveRecipe(recipe);
            return data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        addLoadCases(builder);
        addRemoveCases(builder);
        addSaveCases(builder);
    },
});

function addLoadCases(builder: ActionReducerMapBuilder<RecipesState>) {
    builder
        .addCase(load.pending, (state) => {
            state.loadState = 'pending';
        })
        .addCase(load.fulfilled, (state, action) => {
            if (action.payload) {
                state.recipes = action.payload;
            }
            state.loadState = 'completed';
        })
        .addCase(load.rejected, (state) => {
            state.loadState = 'error';
        });
}

function addSaveCases(builder: ActionReducerMapBuilder<RecipesState>) {
    builder
        .addCase(save.pending, (state) => {
            state.saveState = 'pending';
        })
        .addCase(save.fulfilled, (state, action) => {
            if (action.payload.id) {
                const index = state.recipes.findIndex(
                    (recipe) => recipe.id === action.payload.id
                );
                state.recipes[index] = action.payload as Recipe;
            } else {
                state.recipes.push(action.payload);
            }
            state.saveState = 'completed';
        })
        .addCase(save.rejected, (state) => {
            state.saveState = 'error';
        });
}

function addRemoveCases(builder: ActionReducerMapBuilder<RecipesState>) {
    builder
        .addCase(remove.pending, (state) => {
            state.removeState = 'pending';
        })
        .addCase(remove.fulfilled, (state, action) => {
            const index = state.recipes.findIndex(
                (recipe) => recipe.id === action.payload
            );
            state.recipes.splice(index, 1);
            state.removeState = 'completed';
        })
        .addCase(remove.rejected, (state) => {
            state.removeState = 'error';
        });
}

export const selectRecipes = (state: RootState) => state.recipes.recipes;
export const selectLoadState = (state: RootState) => state.recipes.loadState;
export const selectRemoveState = (state: RootState) => state.recipes.removeState;
export const selectSaveState = (state: RootState) => state.recipes.saveState;

export function selectRecipe(state: RootState): (id?: number) => CreateRecipe {
    return (id?: number): CreateRecipe => {
        const recipe = selectRecipes(state).find((recipe) => recipe.id === id);
        if (!recipe) {
            return DefaultRecipe();
        }
        return recipe;
    };
}

export default recipesSlice.reducer;
