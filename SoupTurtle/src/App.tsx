import './App.css';
import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { RecipesProvider } from './recipes/Context';
import Welcome from './Welcome';
import './shared/i18n';
import NotFound from './shared/NotFound';
import { useTranslation } from 'react-i18next';

const Menu = React.lazy(() => import('./shared/Menu'));
const RecipesList = React.lazy(() => import('./recipes/List'));
// import { Form } from './form/Form';
// import { Edit } from './edit/Edit';
// import { NotFound } from './NotFound';


const App: React.FC = () => {
  
  const queryClient = new QueryClient();
  const { t } = useTranslation();

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
    //   path: '/Recipes/Form',
    //   element: <Form />,
    // },
    {
      path: '/Recipes/List',
      element: (
        <ErrorBoundary FallbackComponent={({ error }) => <div>{error.message}</div>} >
          <Suspense fallback={<div>{t('main.loading')}</div>}>
            <Menu />
            <RecipesList />
          </Suspense>
        </ErrorBoundary>
      ),
      // children: [{ path: 'edit/:id', element: <Edit /> }],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecipesProvider>
          <Suspense fallback={<div>{t('main.loading')}</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </RecipesProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
