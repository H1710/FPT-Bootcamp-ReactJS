/**
 * This is a function that returns a random string fixed number of characters alphabet or number
 * @param length : Number - Length of random string
 * @example
 * generateRandomString(10) : output(atAHGk12s2)
 * @description
 * Condition: length is not null or undefined and at least 1 character
 * @returns string: random string
 * @author QuachHoangHuy
 * @version 1.0.0.0
 */
export const generateRandomString = (length) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  if (length) {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset[randomIndex];
    }
  }

  return randomString;
};
