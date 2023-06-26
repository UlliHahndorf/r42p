/* eslint-disable no-case-declarations */
import {
    Dispatch,
    ReactNode,
    createContext,
    useContext,
    useMemo,
    useReducer,
  } from 'react';
  import { Recipe, CreateRecipe } from '../shared/types/Recipe';
  import { produce } from 'immer';
  
  type RecipesContextType = [Recipe[], Dispatch<Action>];
  
  const RecipesContext = createContext<RecipesContextType | null>(null);
  
  type Action = {
    type:
      | 'FETCH'
      | 'FETCH_SUCCESS'
      | 'DELETE'
      | 'DELETE_SUCCESS'
      | 'SAVE'
      | 'SAVE_SUCCESS';
    payload?: number | CreateRecipe | Recipe[];
  };
  
  function middleware(dispatch: Dispatch<Action>) {
    return async function (action: Action) {
      switch (action.type) {
        case 'SAVE':
          let url = import.meta.env.VITE_BACKEND_URL + '/recipes';
          let method = 'POST';
  
          if ((action.payload as Recipe).Id) {
            url += '/' + (action.payload as Recipe).Id;
            method = 'PUT';
          }
          const createResponse = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(action.payload),
          });
          const newRecipe = await createResponse.json();
          dispatch({ type: 'SAVE_SUCCESS', payload: newRecipe });
          middleware(dispatch)({ type: 'FETCH' });
          break;
        case 'FETCH':
          const fetchResponse = await fetch(
            import.meta.env.VITE_BACKEND_URL + '/recipes'
          );
          const recipes = await fetchResponse.json();
          dispatch({ type: 'FETCH_SUCCESS', payload: recipes });
          break;
        case 'DELETE':
          await fetch(`http://localhost:3001/recipes/${action.payload}`, {
            method: 'DELETE',
          });
          dispatch({ type: 'DELETE_SUCCESS', payload: action.payload });
          break;
      }
    };
  }
  
  function reducer(state: Recipe[], action: Action) {
    switch (action.type) {
      case 'DELETE_SUCCESS':
        return produce(state, (draftState) => {
          return draftState.filter((recipe) => recipe.Id !== action.payload);
        });
      case 'FETCH_SUCCESS':
        return action.payload as Recipe[];
      case 'SAVE_SUCCESS':
        return produce(state, (draftState) => {
          const index = draftState.findIndex(
            (recipe) => recipe.Id === (action.payload as Recipe).Id
          );
  
          if (index !== -1) {
            draftState[index] = action.payload as Recipe;
          } else {
            draftState.push(action.payload as Recipe);
          }
        });
      default:
        return state;
    }
  }
  
  type Props = {
    children: ReactNode;
  };
  const RecipesProvider: React.FC<Props> = ({ children }) => {
    const [data, dispatch] = useReducer(reducer, []);
  
    const middlewareDispatch = useMemo(() => middleware(dispatch), [dispatch]);
  
    return (
      <RecipesContext.Provider value={[data, middlewareDispatch]}>
        {children}
      </RecipesContext.Provider>
    );
  };
  
  function useRecipesContext(): RecipesContextType {
    const recipesContext = useContext(RecipesContext);
  
    if (recipesContext === null) {
      throw new Error('useRecipesContext can only be used within a RecipesProvider');
    }
  
    return recipesContext;
  }
  
  export { RecipesProvider, useRecipesContext };
  