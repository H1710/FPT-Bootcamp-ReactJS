/**
 * This is a function that update answer of user when they choose single choice question
 * @param prevSelectedAnswers : Object - previous answer of user
 * @param questionId : string
 * @param answer : string
 *
 * @example
 * generateRandomString({"1": "A", "2":"A", "3":"B"}, 2, "C") : output({"1": "A", "2":"C", "3":"B"})
 * @description
 * Condition: questionId is not null or undefined or empty
 * Condition: answer is not null or undefined or empty
 * Condition: prevSelectedAnswers include questionId
 *
 * @returns object: current answer
 * @author QuachHoangHuy
 * @version 1.0.0.0
 */
export const handleSingleChoiceSelection = (
  prevSelectedAnswers,
  questionId,
  answer
) => {
  if (questionId && answer) {
    const updatedAnswers = { ...prevSelectedAnswers };
    updatedAnswers[questionId] = answer;
    return updatedAnswers;
  } else {
    return prevSelectedAnswers;
  }
};

/**
 * This is a function that update answer of user when they choose single choice question
 * @param prevSelectedAnswers : Object - previous answer of user
 * @param questionId : string
 * @param answer : string
 *
 * @example
 * generateRandomString({"1": "A", "2":["A"], "3":"B"}, 2, "C") : output({"1": "A", "2":["A", "C"], "3":"B"})
 * @description
 * Condition: questionId is not null or undefined or empty
 * Condition: answer is not null or undefined or empty
 * Condition: prevSelectedAnswers include questionId
 *
 * @returns object: current answer
 * @author QuachHoangHuy
 * @version 1.0.0.0
 */
export const handleMultipleChoiceSelection = (
  prevSelectedAnswers,
  questionId,
  answer
) => {
  if (questionId && answer) {
    const updatedAnswers = { ...prevSelectedAnswers };

    if (updatedAnswers[questionId].includes(answer)) {
      updatedAnswers[questionId] = updatedAnswers[questionId].filter(
        (a) => a !== answer
      );
    } else {
      updatedAnswers[questionId].push(answer);
    }

    return updatedAnswers;
  } else {
    return prevSelectedAnswers;
  }
};
