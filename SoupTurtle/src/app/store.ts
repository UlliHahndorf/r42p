import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../features/recipes/recipesSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
