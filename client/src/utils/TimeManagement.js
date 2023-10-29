/**
 * This is a function that returns time remaining of quiz base on time of quiz and time save in local storage
 * @param testTimeMinutes : Number - Minutes of quiz
 * @example
 * getTimeRemaining(20)
 * @description
 * Condition: testTimeMinutes at least 1 minute
 * @returns number: remaining second
 * @author QuachHoangHuy
 * @version 1.0.0.0
 */
export const getTimeRemaining = (testTimeMinutes) => {
  if (testTimeMinutes > 0) {
    const initTime = localStorage.getItem("quiz-time");
    if (!initTime) {
      localStorage.setItem("quiz-time", Date.now());
      return testTimeMinutes * 60;
    } else {
      return testTimeMinutes * 60 - Math.floor((Date.now() - initTime) / 1000);
    }
  } else {
    return 0;
  }
};

/**
 * This is a function that returns time format(mm:ss) base on second
 * @param second : Number
 * @example
 * convertSecondToMinutes(80) - output(01:20)
 * @description
 * Condition: second is not null or undefined and at least 1.
 * @returns object : {minutes, second}
 * @author QuachHoangHuy
 * @version 1.0.0.0
 */
export const convertSecondToMinutes = (second) => {
  if (second && second > 0) {
    let minutes = Math.floor(second / 60);
    let remainSecond = second - minutes * 60;
    if (second <= 0) {
      minutes = 0;
      remainSecond = 0;
    }
    if (remainSecond < 10) {
      remainSecond = "0" + remainSecond;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return { minutes, remainSecond };
  } else {
    return { minutes: 0, remainSecond: 0 };
  }
};
