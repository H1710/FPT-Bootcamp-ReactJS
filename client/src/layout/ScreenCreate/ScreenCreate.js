import React, { useCallback, useRef, useState } from "react";
import "../ScreenCreate/style.scss";
import CustomInput from "../../component/Input/CustomInput";
import CustomButton from "../../component/Button/CustomButton";
import Question from "../../component/Question/Question";
import { createQuiz } from "./CreateService";
import { useNavigate } from "react-router-dom";

const ScreenCreate = () => {
  const inputTitleRef = useRef("");
  const inputDescriptionRef = useRef("");
  const inputQuizCodeRef = useRef("");
  const inputTimeRef = useRef("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [lsQuiz, setLsQuiz] = useState([]);

  const createQuestion = useCallback(() => {
    setLsQuiz((prev) => {
      const id = Math.floor(100000 + Math.random() * 900000);

      return [
        ...prev,
        {
          id: id,
          content: "",
          isMultiple: false,
          answer: [
            {
              id: Math.floor(100000 + Math.random() * 900000),
              content: "",
              isCorrect: true,
            },
          ],
        },
      ];
    });
  }, []);

  const deleteQuestion = (id) => {
    setLsQuiz((prev) => prev.filter((question) => question.id !== id));
  };

  const handleCreate = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        console.log(lsQuiz);
        const quizData = {
          title: inputTitleRef.current.getValue(),
          description: inputDescriptionRef.current.getValue(),
          quizCode: inputQuizCodeRef.current.getValue(),
          lsQuiz: lsQuiz,
          time: inputTimeRef.current.getValue(),
        };
        setLoading(true);
        const data = await createQuiz(quizData);
        // console.log(data);
        if (data.message === "Success") {
          navigate("/");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        navigate(`/error/500`, {
          state: { errorMessage: "An error occurred." },
        });
      }
    },
    [lsQuiz]
  );

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        <form action="" onSubmit={handleCreate}>
          <CustomInput
            label={"Title"}
            type={"text"}
            name={"title"}
            id={"title"}
            ref={inputTitleRef}
          />
          <CustomInput
            label={"Description"}
            type={"text"}
            name={"description"}
            id={"description"}
            ref={inputDescriptionRef}
          />
          <CustomInput
            label={"Quiz code"}
            type={"text"}
            name={"quizcode"}
            id={"quizcode"}
            ref={inputQuizCodeRef}
          />
          <CustomInput
            label={"Time"}
            type={"number"}
            name={"time"}
            id={"time"}
            ref={inputTimeRef}
          />

          {/* <input
            type="file"
            ref={inputFileRef}
            accept=".json"
            onChange={handleFileChange}
            required
          /> */}

          {lsQuiz.map((question, index) => (
            <>
              <br />
              <Question
                key={question.id}
                question={question}
                lsQuiz={lsQuiz}
                setLsQuiz={setLsQuiz}
              />
              <div className="delete-btn">
                <CustomButton
                  classContent={"danger"}
                  text={"Delete question"}
                  isLoading={false}
                  size={"sm"}
                  type={"button"}
                  handleSubmit={() => deleteQuestion(question.id)}
                />
              </div>
            </>
          ))}
          <br />
          <CustomButton
            classContent={"primary"}
            text={"New question"}
            isLoading={false}
            size={"sm"}
            type={"button"}
            handleSubmit={createQuestion}
          />

          <div className="btn-container">
            <CustomButton
              classContent={"primary"}
              text={"Create"}
              isLoading={loading}
              size={"sm"}
              type={"submit"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScreenCreate;
