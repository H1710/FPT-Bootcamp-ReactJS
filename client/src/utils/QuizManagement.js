import { generateRandomString } from "./StringManagement";

export const randomQuiz = (quiz) => {
  const str = generateRandomString(quiz.lsQuiz.length);

  localStorage.setItem("random-string", str);
  const newLsQuiz = quiz.lsQuiz;
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < str.length; j++) {
      if (str[i] > str[j]) {
        const temp = newLsQuiz[i];
        newLsQuiz[i] = newLsQuiz[j];
        newLsQuiz[j] = temp;
      }
    }
  }
  quiz.lsQuiz = newLsQuiz;
  return quiz;
};
