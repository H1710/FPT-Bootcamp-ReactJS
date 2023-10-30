import React from "react";
import CustomButton from "../Button/CustomButton";
import "../Dialog/style.scss";

const Dialog = ({ handleClose, handleConfirm }) => {
  return (
    <div className="dialog-background" id="dialogBackground">
      <div className="dialog">
        {/* <h3>Dialog Title</h3> */}
        <p>Do you want to submit?</p>
        <div className="btn-container">
          <CustomButton
            handleSubmit={handleClose}
            classContent={"md secondary"}
            text={"Close"}
          />
          <CustomButton
            handleSubmit={handleConfirm}
            classContent={"md primary"}
            text={"Confirm"}
          />
        </div>
      </div>
    </div>
  );
};

export default Dialog;
