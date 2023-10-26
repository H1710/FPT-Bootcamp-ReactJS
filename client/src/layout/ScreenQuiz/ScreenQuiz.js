import React, { useEffect, useState } from "react";
import Welcome from "./Welcome/Welcome";
import "./screenHome.scss";
import Exam from "./Exam/Exam";
import { useLocation } from "react-router-dom";

const ScreenQuiz = () => {
  // Main Screen
  // Container Component - Luôn luôn gọi API tại main screen
  // Presentation Component - Component con nhận data
  // Truyền Data cho các component con => Tái sử dụng
  // Đạt chuẩn The Single Source Of Truth
  const [welcome, setWelcome] = useState(true);
  const { state } = useLocation();
  const start = () => {
    // import("../../utils/StringManagement").then((n) => {
    //   n.IsUpperCase();
    // });
    setWelcome(false);
  };
  const back = () => {
    setWelcome(true);
  };

  const submitQuiz = () => {};
  return (
    <div className="quiz-container">
      <div className="quiz-content">
        {welcome ? (
          <div className="quiz-welcome">
            <Welcome handleSubmit={start} />
          </div>
        ) : (
          <>
            <div className="quiz-exam">
              <Exam handleSubmit={submitQuiz} quiz={state.quiz} back={back} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScreenQuiz;
