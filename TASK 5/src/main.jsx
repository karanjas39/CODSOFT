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
import DashboardCreator, {
  getCreatorDetail,
} from "./Components/Dashboard/DashboardCreator";
import DashboardTaker, {
  getTakerDetail,
} from "./Components/Dashboard/DashboardTaker";
import CreateQuiz from "./Components/CreateQuiz/CreateQuiz";
import TakeQuiz, {
  getTakerDetailAndReadyQuiz,
} from "./Components/TakeQuiz/TakeQuiz";
import AllQuiz, { getAllQuizesInMain } from "./Components/AllQuiz/AllQuiz";
import Quizcertificate from "./Components/QuizCertificate.jsx/Quizcertificate";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="quiz">
        <Route path="all" element={<AllQuiz />} loader={getAllQuizesInMain} />
        <Route path="certificate/:cid" element={<Quizcertificate />} />
        <Route path="create" element={<CreateQuiz />} />
        <Route
          path="take/:qid"
          element={<TakeQuiz />}
          loader={getTakerDetailAndReadyQuiz}
        />
      </Route>
      <Route path="dashboard">
        <Route
          path="creator"
          element={<DashboardCreator />}
          loader={getCreatorDetail}
        />
        <Route
          path="taker"
          element={<DashboardTaker />}
          loader={getTakerDetail}
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
