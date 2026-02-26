import { NextFunction, Request, Response } from "express";
import { Messages } from "../constant/message";
import { AddCatatanPelanggaranSchema, AddManyCatatanPelanggaranSchema } from "../validation/CatatanPelanggaranSchema";
import { ZodError } from "zod";

export const validateCatatanPelanggaranInputMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: AddCatatanPelanggaranDTO = req.body;

    try {
        AddCatatanPelanggaranSchema.parse(input);
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

export const validateManyCatatanPelanggaranInputMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: AddManyCatatanPelanggaranDTO = req.body;
    try {
        const result = AddManyCatatanPelanggaranSchema.safeParse(input);
        if (!result.success) {
            return res.status(400).json({
                message: result.error.issues.map(issue => ({field: issue.path[0], index: issue.path[1], message: issue.message}))
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