import { generateRandomString } from "./StringManagement";

/**
 * This is a function that returns a random array base on defined array and sort by random string
 * @param array : Array - Defined array
 * @example
 * randomArray([1, 2, 3, 4, 5]) : output([2, 3, 1, 5 , 4])
 * @description
 * Condition: array is not null or undefined and at least 1 element
 * @returns array: random array
 * @author QuachHoangHuy
 * @version 1.0.0.0
 */
export const randomArray = (array) => {
  if (array && array.length) {
    const str = generateRandomString(array.length);

    localStorage.setItem("random-string", str);
    const newLsQuiz = array;
    for (let i = 0; i < str.length; i++) {
      for (let j = 0; j < str.length; j++) {
        if (str[i] > str[j]) {
          const temp = newLsQuiz[i];
          newLsQuiz[i] = newLsQuiz[j];
          newLsQuiz[j] = temp;
        }
      }
    }
    return newLsQuiz;
  } else {
    return array;
  }
};
