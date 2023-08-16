import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Menu from './shared/components/Menu';
import * as Common from './shared/components/Common';

import Welcome from './features/welcome/Welcome';
import RecipeEdit from './features/recipes/edit/Edit';
import RecipesList from './features/recipes/list/List';
import RecipesGrid from './features/recipes/grid/Grid';
import WeekPlan from './features/weekplan/WeekPlan';

// Styles
import './App.css';
import './shared/styles/fontawesome-all.min.css';
import 'devextreme/dist/css/dx.light.css';
import './shared/styles/devextreme.css';

// option: lazy import
//const RecipesList = React.lazy(() => import('./features/recipes/list/List'));

const App: React.FC = () => {

  const theme = createTheme({
    palette: {
      primary: { main: '#1976d2' },
      secondary: { main: '#42a5f5' },
    },
  });

  // Set default langauge
  Common.SetLanguage('de');

  return (
    <>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Common.Progress />}>
          <ErrorBoundary FallbackComponent={({ error }) => <Common.Feedback text={error.message} level='error' />}>
            <BrowserRouter>
            <Menu />
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/recipes/grid" element={<RecipesGrid dSource='REST' />} />
                <Route path="/recipes/grido" element={<RecipesGrid dSource='ODATA' />} />
                <Route path="/recipes/list" element={<RecipesList />}>
                  <Route path="edit/:id" element={<RecipeEdit />} />
                  <Route path="new" element={<RecipeEdit />} />
                </Route>
                <Route path="/weekplan" element={<WeekPlan />} />
                <Route path="*" element={<Common.NotFound />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </Suspense>
      </ThemeProvider>
    </>
  );
};

export default App;
