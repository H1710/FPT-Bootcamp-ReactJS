import React from "react";
import "../Countdown/style.scss";
import { convertSecondToMinutes } from "../../utils/TimeManagement";
const Countdown = ({ time }) => {
  const { minutes, remainSecond } = convertSecondToMinutes(time);
  return (
    <div className="countdown-container">
      {minutes} : {remainSecond}
    </div>
  );
};

export default Countdown;
