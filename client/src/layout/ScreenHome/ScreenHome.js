import React, { useRef, useState } from "react";
import "../ScreenHome/screenHome.scss";
import CustomButton from "../../component/Button/CustomButton";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../component/Input/CustomInput";

const ScreenHome = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizzcode = inputRef.current.getValue();
    if (!quizzcode) {
      setErrorMessage("Quizz code is required");
      return;
    }
    setLoading(true);
    const data = await import("./HomeService").then((n) => {
      return n.getQuiz(quizzcode);
    });
    if (data.quiz) {
      const quiz = await import("../../utils/QuizManagement").then((n) => {
        return n.randomQuiz(data.quiz);
      });
      navigate(`quiz/${quizzcode}`, {
        state: {
          quiz: quiz,
        },
      });
    } else {
      setErrorMessage("Quizz code is not correct");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="container-home">
      <CustomInput
        type={"text"}
        id={"quizzCode"}
        name={"quizzCode"}
        placeholder={"Quizz Code"}
        ref={inputRef}
        autoComplete={"off"}
        isRequire={true}
        errorMessage={errorMessage}
      />

      <CustomButton
        type="submit"
        // handleSubmit={handleSubmit}
        text={"Submit"}
        classContent={"primary"}
        size={"full md"}
        isLoading={loading}
      />
    </form>
  );
};

export default ScreenHome;
