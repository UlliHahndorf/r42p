import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './shared/i18n';
import NotFound from './shared/components/NotFound';
import Menu from './shared/components/Menu';
import Progress from './shared/components/Progress';
import Feedback from './shared/components/Feedback';

import Welcome from './features/welcome/Welcome';
//import RecipeForm from './features/recipes/form/Form';
import RecipeEdit from './features/recipes/edit/Edit';
import RecipesList from './features/recipes/list/List';
import WeekPlan from './features/weekplan/WeekPlan';
import './App.css';

const App: React.FC = () => {

  const theme = createTheme({
    palette: {
      primary: { main: '#1976d2' },
      secondary: { main: '#42a5f5' },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Progress />}>
          <ErrorBoundary FallbackComponent={({ error }) => <Feedback text={error.message} level='error' />}>
            <BrowserRouter>
            <Menu />
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/recipes/list" element={<RecipesList />}>
                  <Route path="edit/:id" element={<RecipeEdit />} />
                  <Route path="new" element={<RecipeEdit />} />
                </Route>
                <Route path="/weekplan" element={<WeekPlan />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </Suspense>
      </ThemeProvider>
    </>
  );
};

export default App;
