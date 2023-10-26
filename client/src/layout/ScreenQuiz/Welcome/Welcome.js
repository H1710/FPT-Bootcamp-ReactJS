import React from "react";
import "../Welcome/style.scss";
import CustomButton from "../../../component/Button/CustomButton";

const Welcome = ({ handleSubmit }) => {
  return (
    <div className="welcome-container">
      <h1>Welcome, Client</h1>
      <p>Please provide your name and email address to get started.</p>
      <form onSubmit={handleSubmit}>
        <div className="welcome-input">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <br />
        <div className="welcome-input">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <br />
        <div className="btn-container">
          <CustomButton
            classContent={"md primary"}
            text={"Next"}
            isLoading={false}
          />
        </div>
      </form>
    </div>
  );
};

export default Welcome;
