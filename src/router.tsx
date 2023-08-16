import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";
import User from "./pages/user";
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
      path: "/sys/user",
      Component: User,
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
