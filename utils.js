import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

const generateJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const decodeJwtToken = (token) => {
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    console.error("Error in Jwt Decoding", error);
    return null;
  }
};

const getCurrentDate = () => {

  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();

  return day + "/" + month + "/" + year;
}

export { getCurrentDate, decodeJwtToken, generateJwtToken };
