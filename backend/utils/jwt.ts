import jwt from "jsonwebtoken";

export const jwtToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "15m" });
}

export const refreshToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
}
export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!);
}