import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import Login from "./pages/login";
import User from "./pages/user";
import BasicLayout from "./layouts";
import { antdUtils } from "./utils/antd";
import { useEffect } from "react";
import { App } from "antd";

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
  const { notification, message, modal } = App.useApp();

  useEffect(() => {
    antdUtils.setMessageInstance(message);
    antdUtils.setNotificationInstance(notification);
    antdUtils.setModalInstance(modal);
  }, [notification, message, modal]);
  return <RouterProvider router={router} />;
};

export default Router;
