import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../Components/AuthLayout";
import Login from "../Modules/Auth/Login/Login";
import Regsiter from "../Modules/Auth/Regsiter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Regsiter /> },
    ],
  },
]);

export default router;
