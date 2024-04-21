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
import Dashboard from "./components/Dashboard/Dashboard";
import BlogCreate, { handleCreateBlog } from "./components/Blog/BlogCreate";
import Details, { getDetails } from "./components/Dashboard/Details";
import BlogView, { getBlog } from "./components/Blog/BlogView";
import BLogUpdate, { blogUpdateInit } from "./components/Blog/BLogUpdate";
import BlogList from "./components/Blog/BlogList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<App />} />
      <Route path="login" element={<Login />} action={handleLogin} />
      <Route path="blogs" element={<BlogList />} />
      <Route path="register" element={<Register />} />
      <Route
        // path="dashboard/:uid"
        path="dashboard"
        element={<Dashboard />}
      >
        <Route loader={getDetails} path="user" element={<Details />} />
        <Route
          path="blog/create"
          element={<BlogCreate />}
          action={handleCreateBlog}
        />
        <Route loader={getBlog} path="blog/view/:bid" element={<BlogView />} />
        <Route
          loader={getBlog}
          path="blog/update/:bid"
          element={<BLogUpdate />}
          action={blogUpdateInit}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
