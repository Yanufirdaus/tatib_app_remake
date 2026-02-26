import { NextFunction, Request, Response } from "express";
import { Messages } from "../constant/message";
import { tr } from "zod/v4/locales";
import { AddPelanggaranSchema, UpdatePelanggaranSchema } from "../validation/PelanggaranSchema";
import { ZodError } from "zod";

export const validatePelanggaranInputMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: AddPelanggaranDTO[] = req.body;

    console.log("Input data:", input);
    
    try {
        const result = AddPelanggaranSchema.safeParse(input);
        if (!result.success) {
            return res.status(400).json({
                message: result.error.issues.map(issue => ({index: issue.path[0], field: issue.path[1], message: issue.message}))
            });
        }
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
}

export const validateUpdatePelanggaranMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: UpdatePelanggaranDTO = req.body[0];

    try {
        UpdatePelanggaranSchema.parse(input);
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
}