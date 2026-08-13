import { sign } from "jsonwebtoken";

const generateToken = (data) => {
  const token = sign({ ...data }, process.env.privateKey, {
    algorithm: "HS256",
    expiresIn: "24h",
  });

  return token;
};

export default generateToken;
