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
import { SocketContextProvider } from 'context/SocketContext';
import { AboutPage } from 'pages/AboutPage/AboutPage';
import { ContactUs } from 'pages/ContactUs/ContactUs';
import { AgentsPage } from 'pages/AgentsPage/AgentsPage';

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
        {
          path: '/about',
          element: <AboutPage />,
        },
        {
          path: '/contact',
          element: <ContactUs />,
        },
        {
          path: '/agents',
          element: <AgentsPage />,
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
      <SocketContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </SocketContextProvider>
    </AuthContextProvider>
  );
};
