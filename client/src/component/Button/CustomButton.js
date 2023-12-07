import React from "react";
import "../Button/style.scss";
import CircularProgress from "@mui/material/CircularProgress";

const CustomButton = ({
  text,
  size,
  type,
  color,
  classContent,
  handleSubmit,
  isLoading,
}) => {
  return (
    <button
      onClick={handleSubmit}
      className={`${classContent} ${size} ${isLoading && " loading"}`}
      disabled={isLoading}
      type={type}
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
