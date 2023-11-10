import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { Aside } from './components/Aside';
import { ErrorPage } from './components/ErrorPage';
import { Main } from './components/Main';
import { ContentState } from './context/ContentContext';
import { SearchQueryState } from './context/SearchQueryContext';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Main />,
        children: [
          {
            path: '/details/:id',
            element: <Aside />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SearchQueryState>
      <ContentState>
        <RouterProvider router={router} />
      </ContentState>
    </SearchQueryState>
  </React.StrictMode>
);
