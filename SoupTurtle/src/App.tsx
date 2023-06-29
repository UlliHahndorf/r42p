import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './shared/i18n';
import Welcome from './Welcome';
import NotFound from './shared/components/NotFound';
import Menu from './shared/components/Menu';
import Progress from './shared/components/Progress';
import Feedback from './shared/components/Feedback';

import RecipeForm from './features/recipes/form/Form';
import RecipeEdit from './features/recipes/edit/Edit';
import RecipesList from './features/recipes/list/List';
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
              <Routes>
                <Route path="/" element={<><Menu /><Welcome /></>} />
                <Route path="/recipes/list" element={<><Menu /><RecipesList /></>}>
                  <Route path="edit/:id" element={<RecipeEdit />} />
                </Route>
                <Route path="/recipes/form" element={<><Menu /><RecipeForm recipe={null} /></>} />
                <Route path="*" element={<><Menu /><NotFound /></>} />
              </Routes>
            </BrowserRouter>
          </ErrorBoundary>
        </Suspense>
      </ThemeProvider>
    </>
  );
};

export default App;
