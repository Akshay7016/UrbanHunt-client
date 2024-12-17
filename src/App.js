import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from 'pages/HomePage/HomePage';
import { ListPage } from 'pages/ListPage/ListPage';
import { Layout } from 'pages/Layout/Layout';
import { SinglePage } from 'pages/SinglePage/SinglePage';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';

export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/list',
          element: <ListPage />,
        },
        {
          path: '/:id',
          element: <SinglePage />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
