import { RouterProvider, createHashRouter } from "react-router-dom";
import Login from "./pages/login";
import BasicLayout from "./layouts";
// import Result404 from "./404";
function App() {
  const router = createHashRouter([
    {
      path: "/user/login",
      Component: Login,
    },
    // {
    //   path: "/",
    //   Component: BasicLayout,
    //   children: [],
    // },
    {
      path: "*",
      Component: BasicLayout,
      children: [],
    },
  ]);
  return <RouterProvider router={router} />;
}
export default App;
