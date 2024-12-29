import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { HomePage } from 'pages/HomePage/HomePage';
import { ListPage } from 'pages/ListPage/ListPage';
import { Layout, RequireAuth } from 'pages/Layout/Layout';
import { SinglePage } from 'pages/SinglePage/SinglePage';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';
import { Register } from 'pages/Register/Register';
import { Login } from 'pages/Login/Login';
import { AuthContextProvider } from 'context/AuthContext';
import { UpdateProfile } from 'pages/UpdateProfile/UpdateProfile';
import { NewPostPage } from 'pages/NewPostPage/NewPostPage';

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
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
      ],
    },
    {
      path: '/',
      element: <RequireAuth />,
      children: [
        {
          path: '/profile',
          element: <ProfilePage />,
        },
        {
          path: '/profile/update',
          element: <UpdateProfile />,
        },
        {
          path: '/createPost',
          element: <NewPostPage />,
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
