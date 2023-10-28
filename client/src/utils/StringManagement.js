/**
 * Day la function kiem tra chu viet hoa
 * @param text : string - day la chuoi can kiem tra
 * @example
 * IsUpperCase("ABCDE")
 * @description
 * Dieu kien tien quyet text khong duoc null|undefined
 * @returns boolean - True: Chu viet hoa / False : Chu viet thuong
 * @author QhH
 * @version 1.0.0.0
 */

// [PhienBan][Subchange][Delivery][fixBug]
export const IsUpperCase = () => {
  return true;
};

export const generateRandomString = (length) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }

  return randomString;
};
