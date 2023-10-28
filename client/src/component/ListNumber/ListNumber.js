import React from "react";
import "../ListNumber/style.scss";

const ListNumber = ({
  lsQuiz,
  formData,
  currentQuestion,
  setCurrentQuestion,
}) => {
  return (
    <div className="list-number-container">
      {lsQuiz.map((question, index) => (
        <div
          key={index}
          className={`number-container ${
            currentQuestion === index && "current"
          } ${formData[question._id] && "answered"}`}
          onClick={() => setCurrentQuestion(index)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default ListNumber;
