import React, { useEffect, useState } from "react";
import "../Exam/style.scss";
import Card from "../../../component/Card/Card";
import Countdown from "../../../component/Countdown/Countdown";
import CustomButton from "../../../component/Button/CustomButton";
import Dialog from "../../../component/Dialog/Dialog";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";
import ListNumber from "../../../component/ListNumber/ListNumber";

const Exam = ({ formData, setFormData, handleSubmit, lsQuiz, back }) => {
  const quizTime = 5;
  const [timeRemaining, setTimeRemaining] = useState(quizTime);
  const [loading, setLoading] = useState(false);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const handleTime = async () => {
      const timeRemaining = await import("../../../utils/TimeManagement").then(
        (n) => {
          return n.getTimeRemaining(quizTime);
        }
      );
      setTimeRemaining(timeRemaining);
    };
    handleTime();
  }, []);
  const handleSubmitForm = async () => {
    setOpenDialog(false);
    setLoading(true);
    await handleSubmit(formData);
    setLoading(false);
  };
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSubmitForm();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeRemaining]);

  const handleAnswer = async (question, value) => {
    let answer = formData;
    answer = await import("../../../utils/AnswerManagement").then((n) => {
      if (question.isMultiple) {
        return n.handleMultipleChoiceSelection(formData, question._id, value);
      } else {
        return n.handleSingleChoiceSelection(formData, question._id, value);
      }
    });

    setFormData(() => answer);
    localStorage.setItem("formData", JSON.stringify({ ...answer }));
  };

  const openDialog = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <div className="exam-container">
        <ListNumber
          lsQuiz={lsQuiz}
          formData={formData}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
        />

        {lsQuiz && (
          <Card
            handleAnswer={handleAnswer}
            question={lsQuiz[currentQuestion]}
            key={lsQuiz[currentQuestion]._id}
            userAnswer={formData[lsQuiz[currentQuestion]._id]}
          />
        )}

        <div className="icon-container">
          <button
            disabled={currentQuestion <= 0}
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            className={`prev-btn ${currentQuestion <= 0 && "disabled"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <span>
            {currentQuestion + 1} / {lsQuiz.length}
          </span>
          <button
            className={`next-btn ${
              currentQuestion >= lsQuiz.length - 1 && "disabled"
            }`}
            disabled={currentQuestion >= lsQuiz.length - 1}
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        <div className="btn-container">
          <CustomButton
            handleSubmit={back}
            classContent={"md secondary"}
            text={"Previous"}
          />
          <CustomButton
            handleSubmit={openDialog}
            classContent={"md primary"}
            text={"Submit"}
          />
        </div>
      </div>
      <Countdown time={timeRemaining} />
      {isOpenDialog && (
        <Dialog handleClose={closeDialog} handleConfirm={handleSubmitForm} />
      )}
      {loading && <LoadingPage />}
    </>
  );
};

export default Exam;
