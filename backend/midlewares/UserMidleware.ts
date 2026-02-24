import { Messages } from "../constant/message";
import { Request, Response, NextFunction } from "express";

export const UpdateSiswaInputCheckingMiddleware = (
    req: Request, 
    res: Response, 
    next: NextFunction) => 
{
    const data: UpdateUserDTO = req.body;

    console.log("Input data:", data);

    if (!data.name || data.name.trim() === "") {
        return res.status(400).json({ message: Messages.NAME_REQUIRED });
    }
    if (!data.kelasId || isNaN(data.kelasId)) {
        return res.status(400).json({ message: Messages.KELASID_REQUIRED });
    }
    next();
}

export const UpdateTendikInputCheckingMiddleware = (
    req: Request, 
    res: Response, 
    next: NextFunction) => 
{
    const data: UpdateTendikDTO = req.body[0];

    if (!data.name || data.name.trim() === "") {
        return res.status(400).json({ message: Messages.NAME_REQUIRED });
    }
    next();
}