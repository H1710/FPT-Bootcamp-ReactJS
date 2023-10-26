import React from "react";
import "../Button/style.scss";
import CircularProgress from "@mui/material/CircularProgress";

const CustomButton = ({
  text,
  isSuccess,
  classContent,
  handleSubmit,
  isLoading,
}) => {
  return (
    <button
      onClick={handleSubmit}
      className={`${classContent} ${isLoading && " loading"}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <CircularProgress size={16} color="inherit" />
          Loading
        </>
      ) : (
        <>{text}</>
      )}
    </button>
  );
};

export default CustomButton;
