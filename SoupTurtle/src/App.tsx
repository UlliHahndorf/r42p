import './App.css';
import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { RecipesProvider } from './recipes/Context';
import Welcome from './Welcome';

const Menu = React.lazy(() => import('./shared/Menu'));
const List = React.lazy(() => import('./recipes/List'));
// import { Form } from './form/Form';
// import { Edit } from './edit/Edit';
// import { NotFound } from './NotFound';

import './shared/i18n';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary
        FallbackComponent={({ error }) => <div>{error.message}</div>}
      >
        <Welcome/>
      </ErrorBoundary>
    ),
  },
  // {
  //   path: '/form',
  //   element: <Form />,
  // },
  // {
  //   path: '*',
  //   element: <NotFound />,
  // },
  {
    path: '/Recipes/List',
    element: (
      <ErrorBoundary
        FallbackComponent={({ error }) => <div>{error.message}</div>}
      >
        <Suspense fallback={<div>Lade Daten ...</div>}>
          <List />
        </Suspense>
      </ErrorBoundary>
    ),
    // children: [{ path: 'edit/:id', element: <Edit /> }],
  },
]);

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <>
    <Menu />
    <QueryClientProvider client={queryClient}>
      <RecipesProvider>
        <Suspense fallback={<div>Lade ...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </RecipesProvider>
    </QueryClientProvider>
    </>
  );
};

export default App;
