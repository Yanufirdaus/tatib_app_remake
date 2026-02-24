import { NextFunction, Request, Response } from "express";
import { Messages } from "../constant/message";

export const validatePelanggaranInputMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: AddPelanggaranDTO = req.body[0];
    if (!input.jenisId || isNaN(input.jenisId)) {
        return res.status(400).json({ message: Messages.PELANGGARAN_ID_REQUIRED });
    }
    if (!input.pelanggaran || input.pelanggaran.trim() === "") {
        return res.status(400).json({ message: Messages.PELANGGARAN_REQUIRED });
    }
    if (input.poin === undefined || isNaN(input.poin)) {
        return res.status(400).json({ message: Messages.POIN_PELANGGARAN_REQUIRED });
    }

    next();
}