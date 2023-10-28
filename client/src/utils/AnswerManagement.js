export const handleSingleChoiceSelection = (
  prevSelectedAnswers,
  questionId,
  answer
) => {
  const updatedAnswers = { ...prevSelectedAnswers };
  updatedAnswers[questionId] = answer;
  return updatedAnswers;
};

export const handleMultipleChoiceSelection = (
  prevSelectedAnswers,
  questionId,
  answer
) => {
  const updatedAnswers = { ...prevSelectedAnswers };

  if (updatedAnswers[questionId].includes(answer)) {
    updatedAnswers[questionId] = updatedAnswers[questionId].filter(
      (a) => a !== answer
    );
  } else {
    updatedAnswers[questionId].push(answer);
  }

  return updatedAnswers;
};
