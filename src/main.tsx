import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import { Main } from './pages/Main';
import { Reacthook } from './pages/Reacthook';
import { Uncontrolled } from './pages/Uncontrolled';
import { store } from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Main /> },
      {
        path: '/uncontrolled',
        element: <Uncontrolled />,
      },
      { path: '/reacthook', element: <Reacthook /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
