import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.scss";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Login, { handleLogin } from "./components/Login/Login";
import Register from "./components/Register/Register";
import App from "./App";
import Dashboard, { getDetails } from "./components/Dashboard/Dashboard";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />,
//   },
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<App />} />
      <Route path="login" element={<Login />} action={handleLogin} />
      <Route path="register" element={<Register />} />
      <Route
        loader={getDetails}
        // path="dashboard/:uid"
        path="dashboard"
        element={<Dashboard />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
