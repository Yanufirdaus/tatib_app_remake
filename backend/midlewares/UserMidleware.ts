import { Messages } from "../constant/message";
import { Request, Response, NextFunction } from "express";
import { UpdateManySiswaKelasSchema, UpdateTendikSchema, UpdateUserSchema } from "../validation/UpdateUserSchema";
import { ZodError } from "zod";
import { UpdateUserDTO, UpdateTendikDTO } from "../dto/user.dto";

export const UpdateSiswaInputCheckingMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction) => {
    const data: UpdateUserDTO = req.body;

    console.log("Input data:", data);
    try {
        UpdateUserSchema.parse(data);
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

export const UpdateManySiswaKelasInputCheckingMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = req.body;

    try {
        const result = UpdateManySiswaKelasSchema.safeParse(data);
        if (!result.success) {
            return res.status(400).json({
                message: result.error.issues.map(issue => ({ index: issue.path[0], field: issue.path[1], message: issue.message }))
            });
        }
        req.body = result.data;
        next();
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            console.log(err.issues.map(issue => issue.message));
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

export const UpdateTendikInputCheckingMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction) => {
    const data: UpdateTendikDTO = req.body;

    try {
        UpdateTendikSchema.parse(data);
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