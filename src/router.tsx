import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";
import BasicLayout from "./layouts";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/user/login",
      Component: Login,
    },
    {
      path: "/",
      element: <Navigate to="/dashboard" />,
    },

    {
      path: "*",
      Component: BasicLayout,
      children: [],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
