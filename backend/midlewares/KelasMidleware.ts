import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AddKelasSchema } from "../validation/KelasSchema";

export const CreateKelasMidleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: CreateKelasDTO = req.body;

    try {
        AddKelasSchema.parse(input);
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

export const CreateManyKelasMidleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: CreateKelasDTO[] = req.body;
        try {
        const result = AddKelasSchema.array().safeParse(input);
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