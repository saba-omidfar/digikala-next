import jwt from "jsonwebtoken";
import crypto from "crypto";

export default function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}
