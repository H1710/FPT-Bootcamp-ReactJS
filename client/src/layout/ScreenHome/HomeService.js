import { SERVER_DOMAIN } from "../../const/domain";

export const getQuiz = (quizzCode) => {
  const url = `${
    process.env.REACT_APP_SERVER_DOMAIN ?? SERVER_DOMAIN
  }/api/quiz/get/${quizzCode}`;
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      await fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    }, 2000);
  });
};
