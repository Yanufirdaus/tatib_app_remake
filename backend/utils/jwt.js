import jwt from "jsonwebtoken";
import { appConfig } from "../config/app.config";
export const jwtToken = (payload) => {
    return jwt.sign(payload, appConfig.jwt.secret, { expiresIn: "15m" });
};
export const refreshToken = (payload) => {
    return jwt.sign(payload, appConfig.jwt.refreshSecret, { expiresIn: "7d" });
};
export const verifyToken = (token) => {
    return jwt.verify(token, appConfig.jwt.refreshSecret);
};
export const verifyAccessToken = (token) => {
    return jwt.verify(token, appConfig.jwt.secret);
};
