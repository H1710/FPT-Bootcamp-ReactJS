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
    try {
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
        const randomQuiz = await import("../../utils/ArrayManagement").then(
          (n) => {
            return n.randomArray(data.quiz.lsQuiz);
          }
        );
        const quiz = {
          ...data.quiz,
          lsQuiz: randomQuiz,
        };
        navigate(`quiz/${quizzcode}`, {
          state: {
            quiz: quiz,
          },
        });
      } else {
        setErrorMessage("Quizz code is not correct");
      }
      setLoading(false);
    } catch (error) {
      navigate(`/error/500`, {
        state: { errorMessage: "An error occurred." },
      });
    }
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
