import { Request, Response, NextFunction } from "express";
import { UpdateSemesterSchema } from "../validation/UpdateSemesterSchema";
import { ZodError } from "zod";

export const UpdateSemesterMidleware = (
    req: Request, 
    res: Response, 
    next: NextFunction) => 
{
    const { semester, tahun_ajaran } = req.body;
    try {
        UpdateSemesterSchema.parse({ semester, tahun_ajaran });
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