export const getTimeRemaining = (testTimeMinutes) => {
  const initTime = localStorage.getItem("quiz-time");
  if (!initTime) {
    localStorage.setItem("quiz-time", Date.now());
    return testTimeMinutes * 60;
  } else {
    return testTimeMinutes * 60 - Math.floor((Date.now() - initTime) / 1000);
  }
};

export const convertSecondToMinutes = (second) => {
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
};
