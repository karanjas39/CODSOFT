import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.scss";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import App from "./App";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
