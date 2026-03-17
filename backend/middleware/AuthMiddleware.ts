import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { CreateTendikSchema, CreateUserSchema } from "../validation/CreateUserSchema";
import { LoginSchema } from "../validation/LoginSchema";
import { validate } from "./validator";
import { z } from "zod";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";

export const AuthMiddleware = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.cookies.token;

    if (!authHeader) {
        throw new AppError("Authorization header missing", 401);
    }

    try {
        const decoded = verifyAccessToken(authHeader);
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (err) {
        throw new AppError("Invalid or expired token", 401);
    }
});

// Aliasing the misspelled name to avoid breaking routes for now, or just export both
export const AuthMidleware = AuthMiddleware;

export const AdminMiddleware = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        throw new AppError("Unauthorized", 401);
    }
    if (req.user.role !== "admin") {
        throw new AppError("Forbidden: Admins only", 403);
    }
    next();
});

export const TendikAdminMiddleware = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        throw new AppError("Unauthorized", 401);
    }
    const allowedRoles = ["kesiswaan", "admin", "kepsek", "bk"];
    if (!allowedRoles.includes(req.user.role)) {
        throw new AppError("Forbidden: Tendik or Admin only", 403);
    }
    next();
});

export const validateLoginMiddleware = validate(LoginSchema);

export const validateRegisterTendikMiddleware = validate(z.object({
    tendik: CreateTendikSchema
}));

export const validateRegisterSiswaMiddleware = validate(z.object({
    siswa: CreateUserSchema
}));