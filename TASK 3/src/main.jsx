import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.scss";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
