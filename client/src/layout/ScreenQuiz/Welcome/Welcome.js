import React, { useEffect, useRef } from "react";
import "../Welcome/style.scss";
import CustomButton from "../../../component/Button/CustomButton";
import CustomInput from "../../../component/Input/CustomInput";

const Welcome = ({ handleSubmit }) => {
  const inputNameRef = useRef("");
  const inputEmailRef = useRef("");

  const handleSetInfo = (e) => {
    e.preventDefault();
    const name = inputNameRef.current.getValue();
    const email = inputEmailRef.current.getValue();
    handleSubmit(name, email);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const { name, email } = JSON.parse(user);
      if (name) inputNameRef.current.setValue(name);
      if (email) inputEmailRef.current.setValue(email);
    }
  }, []);

  return (
    <div className="welcome-container">
      <h1>Welcome, Client</h1>
      <p>Please provide your name and email address to get started.</p>
      <form onSubmit={handleSetInfo} className="welcome-form">
        <CustomInput
          label={"Name"}
          type={"text"}
          name={"name"}
          id={"name"}
          ref={inputNameRef}
        />

        <br />

        <CustomInput
          label={"Email"}
          type={"email"}
          name={"email"}
          id={"email"}
          ref={inputEmailRef}
        />

        <br />
        <div className="btn-container">
          <CustomButton
            classContent={"primary"}
            text={"Next"}
            isLoading={false}
            size={"md"}
            // handleSubmit={handleSetInfo}
          />
        </div>
      </form>
    </div>
  );
};

export default Welcome;
