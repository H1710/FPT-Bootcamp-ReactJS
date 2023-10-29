import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
import LoadingPage from "./component/LoadingPage/LoadingPage";

function App() {
  const ScreenHome = lazy(() => import("./layout/ScreenHome/ScreenHome"));
  const ScreenQuiz = lazy(() => import("./layout/ScreenQuiz/ScreenQuiz"));
  const NotFound = lazy(() => import("./component/NotFound/NotFound"));
  const ErrorPage = lazy(() => import("./component/ErrorPage/ErrorPage"));
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ScreenHome />
              </Suspense>
            }
          />
          <Route
            path="/quiz/:quizCode"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ScreenQuiz />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingPage />}>
                <NotFound />
              </Suspense>
            }
          />
          <Route path="/error/:errorCode" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
