import './App.css';
import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { RecipesProvider } from './recipes/Context';
import './shared/i18n';
import Welcome from './Welcome';
import NotFound from './shared/NotFound';
import Menu from './shared/Menu';
//import Form from './recipes/Form';
import Edit from './recipes/Edit';

const RecipesList = React.lazy(() => import('./recipes/List'));

const App: React.FC = () => {
  
  const queryClient = new QueryClient();
  const { t } = useTranslation();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#42a5f5',
      },
    },
  });
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ErrorBoundary FallbackComponent={({ error }) => <div>{error.message}</div>}>
          <Menu />
          <Welcome />
        </ErrorBoundary>
      ),
    },
    {
      path: '*',
      element: (
        <>
          <Menu />
          <NotFound />
        </>
      ),
    },
    // {
    //   path: '/recipes/form',
    //   element: <Form />,
    // },
    {
      path: '/recipes/list',
      element: (
        <ErrorBoundary FallbackComponent={({ error }) => <div>{error.message}</div>} >
          <Suspense fallback={<div>{t('main.loading')}</div>}>
            <Menu />
            <RecipesList />
          </Suspense>
        </ErrorBoundary>
      ),
      children: [{ path: 'edit/:id', element: <Edit /> }],
    },
  ]);

  return (
    <>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecipesProvider>
          <Suspense fallback={<div>{t('main.loading')}</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </RecipesProvider>
      </QueryClientProvider>
    </ThemeProvider>
    </>
  );
};

export default App;
