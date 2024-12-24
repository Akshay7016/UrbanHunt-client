import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { HomePage } from 'pages/HomePage/HomePage';
import { ListPage } from 'pages/ListPage/ListPage';
import { Layout } from 'pages/Layout/Layout';
import { SinglePage } from 'pages/SinglePage/SinglePage';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';
import { Register } from 'pages/Register/Register';
import { Login } from 'pages/Login/Login';
import { AuthContextProvider } from 'context/AuthContext';

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
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
      ],
    },
  ]);

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthContextProvider>
  );
};
