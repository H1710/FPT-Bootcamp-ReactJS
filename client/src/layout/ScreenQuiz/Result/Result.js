import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../component/Button/CustomButton";
import "../Result/style.scss";

const Result = ({ result }) => {
  const navigate = useNavigate();
  return (
    <div className="result-container">
      <h1>Result</h1>
      <p>Thanks for participating</p>
      <p>Score : {result}</p>
      <div className="result-form">
        <div className="btn-container">
          <CustomButton
            classContent={"primary"}
            text={"Close"}
            isLoading={false}
            size={"md"}
            handleSubmit={() => navigate("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default Result;
