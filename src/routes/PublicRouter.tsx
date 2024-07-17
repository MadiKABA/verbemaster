import { Route, Routes } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout";

import { HOME, QUIZPAGE } from "../core/constant/RouteName";
import Home from "../page/home/Home";
import QuizPage from "../page/home/QuizPage";

const PublicRoutes = () => {
  const PUBLICROUTES = [
    { path: HOME, element: <Home /> },
    { path: QUIZPAGE, element: <QuizPage /> },
  ];

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {PUBLICROUTES.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
