import './App.css';
import React, { Suspense } from 'react';
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import LanguageSwitch from './shared/LanguageSwitch';
import { RecipesProvider } from './recipes/Context';

const List = React.lazy(() => import('./recipes/List'));
// import { Form } from './form/Form';
// import { Edit } from './edit/Edit';
// import { NotFound } from './NotFound';

import './shared/i18n';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/list" />,
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
    path: '/list',
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
    <h1>SoupTurtle</h1>
    <QueryClientProvider client={queryClient}>
      <RecipesProvider>
        <LanguageSwitch />
        <Suspense fallback={<div>Lade ...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </RecipesProvider>
    </QueryClientProvider>
    </>
  );
};

export default App;
