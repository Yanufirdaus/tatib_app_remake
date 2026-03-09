import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AddKelasSchema, AddManyKelasSchema } from "../validation/KelasSchema";

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
    try {
        const body = req.body;

        if (!body || !Array.isArray(body.kelas)) {
            return res.status(400).json({
                message: "Invalid input: expected property 'kelas' with array of kelas objects",
            });
        }

        const result = AddManyKelasSchema.safeParse(body);
        if (!result.success) {
            return res.status(400).json({
                message: result.error.issues.map(issue => ({
                    path: issue.path.join("."),
                    message: issue.message
                }))
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