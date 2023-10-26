import React from "react";
import "../Countdown/style.scss";
const Countdown = ({ time }) => {
  return <div className="countdown-container">{time}</div>;
};

export default Countdown;
