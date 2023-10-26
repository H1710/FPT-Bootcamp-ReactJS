import React, { useEffect, useState } from "react";
import "../Exam/style.scss";
import Card from "../../../component/Card/Card";
import Countdown from "../../../component/Countdown/Countdown";
import CustomButton from "../../../component/Button/CustomButton";

const Exam = ({ handleSubmit, quiz, back }) => {
  const initialTime = 60;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const initTime = localStorage.getItem("quiz-time");
    if (!initTime) {
      localStorage.setItem("quiz-time", Date.now());
      setTimeRemaining(20 * 60);
    } else {
      setTimeRemaining(20 * 60 - Math.floor((Date.now() - initTime) / 1000));
    }
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      return; // Timer has reached 0, no need to continue
    }

    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeRemaining]);

  const { lsQuizz } = quiz;

  const [formData, setFormData] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("formData")) ||
      lsQuizz.reduce((accumulator, value) => {
        return { ...accumulator, [value._id]: "" };
      }, {})
    );
  });
  const handleAnswer = (questionId, value) => {
    setFormData({
      ...formData,
      [questionId]: value,
    });
    localStorage.setItem(
      "formData",
      JSON.stringify({ ...formData, [questionId]: value })
    );
  };

  return (
    <>
      <div className="exam-container">
        <h1>Let's start</h1>
        <p>Better with limit time in 20 minutes</p>
        <form>
          {lsQuizz &&
            lsQuizz.map((val, id) => (
              <Card
                handleAnswer={handleAnswer}
                question={val}
                key={id}
                userAnswer={formData[val._id]}
              />
            ))}

          <div className="btn-container">
            <CustomButton
              handleSubmit={back}
              classContent={"md primary"}
              text={"Previous"}
              isLoading={false}
            />
            <CustomButton
              // handleSubmit={start}
              classContent={"md primary"}
              text={"Submit"}
              isLoading={false}
            />
          </div>
        </form>
      </div>
      <Countdown time={timeRemaining} />
    </>
  );
};

export default Exam;
