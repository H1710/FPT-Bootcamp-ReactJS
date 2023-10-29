import React from "react";
import "../ErrorPage/style.scss";
import { useLocation, useParams } from "react-router-dom";

const ErrorPage = () => {
  const { errorCode } = useParams();
  const { state } = useLocation();
  const { errorMessage } = state;
  return (
    <div className="error-page">
      <h1>Error {errorCode}</h1>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;
