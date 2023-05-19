import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AppProvider, useApp } from "./provider/AppProvider";

const BeforeRoute = ({ children }) => {
  const {
    user: { isLogin },
  } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isLogin || token) navigate("/");
  }, [isLogin]);

  if (!isLogin) return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <BeforeRoute>
        <Login />
      </BeforeRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <BeforeRoute>
        <Register />
      </BeforeRoute>
    ),
  },
]);

export const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};
