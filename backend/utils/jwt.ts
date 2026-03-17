import jwt from "jsonwebtoken";
import { appConfig } from "../config/app.config";

export interface JWTPayload {
    id: number;
    role: string;
}

export const jwtToken = (payload: JWTPayload) => {
    return jwt.sign(payload, appConfig.jwt.secret!, { expiresIn: "15m" });
}

export const refreshToken = (payload: JWTPayload) => {
    return jwt.sign(payload, appConfig.jwt.refreshSecret!, { expiresIn: "7d" });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, appConfig.jwt.refreshSecret!) as JWTPayload;
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, appConfig.jwt.secret!) as JWTPayload;
}