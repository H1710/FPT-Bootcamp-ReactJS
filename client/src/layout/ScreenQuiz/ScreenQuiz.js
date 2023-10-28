import React, { Suspense, lazy, useEffect, useState } from "react";
import "./screenQuiz.scss";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "../../component/LoadingPage/LoadingPage";
import Exam from "../ScreenQuiz/Exam/Exam";

const ScreenQuiz = () => {
  const [stateQuiz, setStateQuiz] = useState("welcome");
  const { state } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!state?.quiz) {
      navigate("/");
    }
  }, [state, navigate]);

  const [formData, setFormData] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("formData")) ||
      state?.quiz.lsQuiz.reduce((accumulator, value) => {
        if (value.isMultiple) {
          return { ...accumulator, [value._id]: [] };
        } else {
          return { ...accumulator, [value._id]: "" };
        }
      }, {})
    );
  });
  const [result, setResult] = useState("");
  const start = (name, email) => {
    localStorage.setItem("user", JSON.stringify({ name: name, email: email }));
    setStateQuiz("exam");
  };
  const back = () => {
    setStateQuiz("welcome");
  };

  const submitQuiz = async () => {
    const data = await import("./QuizService").then((n) => {
      return n.getResult(state?.quiz.quizCode, formData);
    });
    setResult(`${data.score}/${state?.quiz.lsQuiz.length}`);
    localStorage.clear();
    setStateQuiz("result");
  };

  const Welcome = lazy(() => import("./Welcome/Welcome"));
  const Result = lazy(() => import("./Result/Result"));

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        {stateQuiz === "welcome" ? (
          <div className="quiz-welcome">
            <Suspense fallback={<LoadingPage />}>
              <Welcome handleSubmit={start} />
            </Suspense>
          </div>
        ) : stateQuiz === "exam" ? (
          <div className="quiz-exam">
            <Exam
              formData={formData}
              setFormData={setFormData}
              handleSubmit={submitQuiz}
              lsQuiz={state?.quiz.lsQuiz}
              back={back}
            />
          </div>
        ) : (
          <div className="quiz-result">
            <Suspense fallback={<LoadingPage />}>
              <Result result={result} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenQuiz;
