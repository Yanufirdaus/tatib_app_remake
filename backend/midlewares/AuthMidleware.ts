import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { Messages } from "../constant/message";
import { CreateTendikSchema, CreateUserSchema } from "../validation/CreateUserSchema";
import { ZodError } from "zod";
import { LoginSchema } from "../validation/LoginSchema";

export const AuthMidleware = (req: Request, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;

    console.log("Auth Header:", authHeader);
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded: any = verifyAccessToken(token);
        req.body.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export const AdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
};


export const TendikAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user.role !== "kesiswaan" && req.body.user.role !== "admin" && req.body.user.role !== "kepsek" && req.body.user.role !== "bk") {
        return res.status(403).json({ message: "Forbidden: Tendik only and Admin Only" });
    }
    next();
}


export const validateLoginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nomor_induk, password } = req.body;

  try {
    LoginSchema.parse({ nomor_induk, password });
    next();
  } catch (err: unknown) {

    if (err instanceof ZodError) {
        return res.status(400).json({
            message: err.issues.map(issue => issue.message)
        });
    }
    console.error("Unexpected error:", err);

    return res.status(500).json({
        message: "Internal server error"
    });
}
};


export const validateRegisterTendikMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: CreateTendikDTO = req.body[0];

    try {
        CreateTendikSchema.parse(input);
        next();
    } catch (err: unknown) {

        if (err instanceof ZodError) {
            return res.status(400).json({
                message: err.issues.map(issue => issue.message)
            });
        }
        console.error("Unexpected error:", err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const validateRegisterSiswaMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: CreateSiswaDTO  = req.body[0];
    console.log("Input data:", req.body[0]);
    
    try {
        CreateUserSchema.parse(input);

        next();
    } catch (err: unknown) {

        if (err instanceof ZodError) {
            return res.status(400).json({
                message: err.issues.map(issue => issue.message)
            });
        }

        console.error("Unexpected error:", err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};