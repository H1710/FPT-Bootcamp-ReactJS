import { SERVER_DOMAIN } from "../../const/domain";

export const getQuiz = (quizzCode) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(
        `${
          process.env.REACT_APP_SERVER_DOMAIN ?? SERVER_DOMAIN
        }/api/quiz/get/${quizzCode}`
      )
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