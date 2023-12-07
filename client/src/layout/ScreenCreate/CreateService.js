import { SERVER_DOMAIN } from "../../const/domain";

export const createQuiz = (quizData) => {
  const url = `${
    process.env.REACT_APP_SERVER_DOMAIN ?? SERVER_DOMAIN
  }/api/quiz/create`;
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quizData: quizData }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("");
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    }, 2000);
  });
};
