import React, { useCallback, useState } from "react";
import CustomInput from "../Input/CustomInput";
import "../Question/style.scss";
import CustomButton from "../Button/CustomButton";

const Question = ({ question, lsQuiz, setLsQuiz }) => {
  const handleCreateAnswer = useCallback(() => {
    setLsQuiz((prev) => {
      const newLsQuiz = [...prev];
      const questionToUpdate = newLsQuiz.find(
        (ques) => ques.id === question.id
      );
      const id = Math.floor(100000 + Math.random() * 900000);
      questionToUpdate.answer = [
        ...questionToUpdate.answer,
        {
          id: id,
          content: "",
          isCorrect: false,
        },
      ];

      return newLsQuiz;
    });
  }, []);

  const handleRemoveAnswer = (answerId, questionId) => {
    setLsQuiz((prev) => {
      const newLsQuiz = [...prev];
      const questionToUpdate = newLsQuiz.find((ques) => ques.id === questionId);
      if (questionToUpdate) {
        questionToUpdate.answer = questionToUpdate.answer.filter(
          (answer) => answer.id !== answerId
        );
      }
      return newLsQuiz;
    });
  };
  const handleChange = useCallback((e) => {
    setLsQuiz((prev) => {
      const newLsQuiz = [...prev];
      const questionToUpdate = newLsQuiz.find(
        (ques) => ques.id === question.id
      );
      if (questionToUpdate) {
        questionToUpdate.content = e.target.value;
      }
      return newLsQuiz;
    });
  }, []);

  const handleChangeContent = (e, index) => {
    setLsQuiz((prev) => {
      const newLsQuiz = [...prev];
      const questionToUpdate = newLsQuiz.find(
        (ques) => ques.id === question.id
      );
      questionToUpdate.answer[index].content = e.target.value;
      return newLsQuiz;
    });
  };

  const handleAnswer = (answer) => {
    setLsQuiz((prev) => {
      const newLsQuiz = [...prev];
      const questionToUpdate = newLsQuiz.find(
        (ques) => ques.id === question.id
      );
      for (let i = 0; i < questionToUpdate.answer.length; i++) {
        if (questionToUpdate.answer[i].id == answer.id) {
          questionToUpdate.answer[i].isCorrect = true;
        } else {
          questionToUpdate.answer[i].isCorrect = false;
        }
      }
      return newLsQuiz;
    });
  };
  return (
    <div className="question-container">
      <input
        placeholder="Question"
        name={"content"}
        id={"content"}
        className="content-input"
        // ref={inputTimeRef}
        onChange={handleChange}
      />
      <div className="answer-container">
        {question.answer.map((answer, index) => (
          <div className="answer" id={answer.id} key={answer.id}>
            <input
              type="text"
              placeholder="Answer"
              key={index}
              value={answer.content}
              onChange={(e) => handleChangeContent(e, index)}
            />
            <input
              type="radio"
              id={answer.id}
              name={question.id}
              checked={answer.isCorrect}
              onChange={() => handleAnswer(answer)}
            />
            <div
              className="delete-icon"
              onClick={() => handleRemoveAnswer(answer.id, question.id)}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <CustomButton
        classContent={"primary"}
        text={"New answer"}
        isLoading={false}
        size={"sm"}
        type={"button"}
        handleSubmit={handleCreateAnswer}
      />
    </div>
  );
};

export default Question;
