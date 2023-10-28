import React from "react";
import "../Card/style.scss";

const Card = ({ handleAnswer, question, userAnswer }) => {
  return (
    <div className="card">
      <p>{question.content}</p>
      {question.answer &&
        question.answer.map((val, id) => (
          <label className="card-answer" key={id}>
            {question.isMultiple ? (
              <input
                type="checkbox"
                id={val.id}
                name={question._id}
                value={val.content}
                checked={userAnswer.includes(val.id)}
                onChange={() => handleAnswer(question, val.id)}
              />
            ) : (
              <input
                type="radio"
                id={val.id}
                name={question._id}
                value={val.content}
                checked={userAnswer === val.id}
                onChange={() => handleAnswer(question, val.id)}
              />
            )}{" "}
            <p>{val.content}</p>
          </label>
        ))}
    </div>
  );
};

export default Card;
