import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
import LoadingPage from "./component/LoadingPage/LoadingPage";

function App() {
  const ScreenHome = lazy(() => import("./layout/ScreenHome/ScreenHome"));
  const ScreenQuiz = lazy(() => import("./layout/ScreenQuiz/ScreenQuiz"));
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
