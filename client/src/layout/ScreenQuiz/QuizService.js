// Call API

const GetQuiz = async () => {
  let res = await fetch("");
  let data = await res.json();

  data.splice(0, 5);

  return data;
};
