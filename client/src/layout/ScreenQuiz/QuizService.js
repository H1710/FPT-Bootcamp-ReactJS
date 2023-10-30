import { SERVER_DOMAIN } from "../../const/domain";

export const getResult = (quizzCode, formData) => {
  const url = `${
    process.env.REACT_APP_SERVER_DOMAIN ?? SERVER_DOMAIN
  }/api/quiz/result/${quizzCode}`;
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData: formData }),
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
