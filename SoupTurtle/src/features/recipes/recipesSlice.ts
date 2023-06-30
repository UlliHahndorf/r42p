import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ActionType, getType } from 'typesafe-actions';

import { RootState } from '../../app/store';
import { Recipe, CreateRecipe, DefaultRecipe } from '../../shared/types/Recipe';
import { loadRecipes, removeRecipe, saveRecipe } from '../../api/recipe.api';
import { loadAction, removeAction, saveAction } from './recipes.actions';

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
        console.log("createAsyncThunk load");
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
        addLoadCase(builder);
        addRemoveCase(builder);
        addSaveCase(builder);
    },
});

function addLoadCase(builder: ActionReducerMapBuilder<RecipesState>) {
    builder
    .addCase(getType(loadAction.request), (state) => {
        state.loadState = 'pending';
    })
    .addCase(getType(loadAction.success), (state, action: ActionType<typeof loadAction.success>) => {
            console.log("case builderLoad success");
            if (action.payload) {
                state.recipes = action.payload;
            }
            state.loadState = 'completed';
        }
        )
        .addCase(getType(loadAction.failure), (state) => {
            state.loadState = 'error';
        });
}
function addSaveCase(builder: ActionReducerMapBuilder<RecipesState>) {
    builder
        .addCase(getType(saveAction.request), (state) => {
            state.saveState = 'pending';
        })
        .addCase(
            getType(saveAction.success), (state, action: ActionType<typeof saveAction.success>) => {
                if (action.payload.id) {
                    const index = state.recipes.findIndex(
                        (recipe) => recipe.id === action.payload.id
                    );
                    state.recipes[index] = action.payload as Recipe;
                } else {
                    state.recipes.push(action.payload);
                }
                state.saveState = 'completed';
            }
        )
        .addCase(getType(saveAction.failure), (state) => {
            state.saveState = 'error';
        });
}

function addRemoveCase(builder: ActionReducerMapBuilder<RecipesState>) {
    builder
        .addCase(getType(removeAction.request), (state) => {
            state.removeState = 'pending';
        })
        .addCase(getType(removeAction.success), (state, action: ActionType<typeof removeAction.success>) => {
            const index = state.recipes.findIndex(
                (recipe) => recipe.id === action.payload
            );
            state.recipes.splice(index, 1);
            state.removeState = 'completed';
        })
        .addCase(getType(removeAction.failure), (state) => {
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
