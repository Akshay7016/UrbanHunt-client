import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { HomePage } from "pages/HomePage/HomePage";
import { ListPage } from "pages/ListPage/ListPage";
import { Layout } from "pages/Layout/Layout";
import { SinglePage } from "pages/SinglePage/SinglePage";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage />
        },
        {
          path: "/:id",
          element: <SinglePage />
        }
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}
