import React, { useRef, useState } from "react";
import "../ScreenHome/screenHome.scss";
import CustomButton from "../../component/Button/CustomButton";
import { useNavigate } from "react-router-dom";
import { SERVER_DOMAIN } from "../../const/domain";

const ScreenHome = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputRef.current.value);
    setLoading(true);
    setTimeout(() => {
      fetch(`${SERVER_DOMAIN}/api/quiz/get/${inputRef.current.value}`)
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          if (data) {
            navigate(`quiz/${inputRef.current.value}`, {
              state: {
                quiz: data.quiz,
              },
            });
          }
          return true;
        });
    }, 2000);
  };

  return (
    <div className="container-home">
      <h1>QUIZZZ</h1>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          autoComplete="off"
          ref={inputRef}
          type="text"
          id="name"
          required
        />
        <CustomButton
          type="submit"
          // handleSubmit={handleSubmit}
          text={"Submit"}
          classContent={"md primary"}
          isLoading={loading}
        />
      </form>
    </div>
  );
};

export default ScreenHome;
