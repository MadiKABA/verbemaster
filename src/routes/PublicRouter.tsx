import { Route, Routes } from "react-router-dom";

import PublicLayout from "../layout/PublicLayout";

import {
  HOME,
  LEARNINGPAGE,
  QUIZPAGE,
  RESULTPAGE,
} from "../core/constant/RouteName";
import Home from "../page/home/Home";
import QuizPage from "../page/home/QuizPage";
import LearningPage from "../page/home/LearningPage";
import ResultQuizPage from "../page/home/ResultQuizPage";

const PublicRoutes = () => {
  const PUBLICROUTES = [
    { path: HOME, element: <Home /> },
    { path: QUIZPAGE, element: <QuizPage /> },
    { path: LEARNINGPAGE, element: <LearningPage /> },
    { path: RESULTPAGE, element: <ResultQuizPage /> },
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
