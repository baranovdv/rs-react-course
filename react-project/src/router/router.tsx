import App from '../App';
import { Aside } from '../components/Aside';
import { ErrorPage } from '../components/ErrorPage';
import { Main } from '../components/Main';

const routerConfig = [
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
];

export { routerConfig };
