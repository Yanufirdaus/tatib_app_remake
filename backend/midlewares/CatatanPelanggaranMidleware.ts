import { NextFunction, Request, Response } from "express";
import { Messages } from "../constant/message";

export const validateCatatanPelanggaranInputMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: AddCatatanPelanggaranDTO = req.body;
    if (!input.idPelanggaran || isNaN(input.idPelanggaran)) {
        return res.status(400).json({ message: Messages.PELANGGARAN_ID_REQUIRED });
    }
    if (!input.idPelanggar || isNaN(input.idPelanggar)) {
        return res.status(400).json({ message: Messages.ID_PELANGGAR_REQUIRED });
    }
    if (!input.idKelasPelanggar || isNaN(input.idKelasPelanggar)) {
        return res.status(400).json({ message: Messages.ID_KELAS_PELANGGAR_REQUIRED });
    }
    if (!input.idPencatat || isNaN(input.idPencatat)) {
        return res.status(400).json({ message: Messages.ID_PENCATAT_REQUIRED });
    }
    if (!input.bukti || input.bukti.trim() === "") {
        return res.status(400).json({ message: Messages.BUKTI_PELANGGARAN_REQUIRED });
    }
    if (!input.semester || input.semester.trim() === "") {
        return res.status(400).json({ message: Messages.SEMESTER_PELANGGARAN_REQUIRED });
    }
    if (!input.time || isNaN(Date.parse(input.time.toString()))) {
        return res.status(400).json({ message: Messages.TIME_PELANGGARAN_REQUIRED });
    }
    next();
}

export const validateManyCatatanPelanggaranInputMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: AddManyCatatanPelanggaranDTO = req.body;
    if (!input.idPelanggaran || isNaN(input.idPelanggaran)) {
        return res.status(400).json({ message: Messages.PELANGGARAN_ID_REQUIRED });
    }
    if (!input.idPelanggar || !Array.isArray(input.idPelanggar) || input.idPelanggar.some(id => isNaN(id))) {
        return res.status(400).json({ message: Messages.ID_PELANGGAR_REQUIRED });
    }
    if (!input.idKelasPelanggar || isNaN(input.idKelasPelanggar)) {
        return res.status(400).json({ message: Messages.ID_KELAS_PELANGGAR_REQUIRED });
    }
    if (!input.idPencatat || isNaN(input.idPencatat)) {
        return res.status(400).json({ message: Messages.ID_PENCATAT_REQUIRED });
    }
    if (!input.bukti || input.bukti.trim() === "") {
        return res.status(400).json({ message: Messages.BUKTI_PELANGGARAN_REQUIRED });
    }
    if (!input.semester || input.semester.trim() === "") {
        return res.status(400).json({ message: Messages.SEMESTER_PELANGGARAN_REQUIRED });
    }
    if (!input.time || isNaN(Date.parse(input.time.toString()))) {
        return res.status(400).json({ message: Messages.TIME_PELANGGARAN_REQUIRED });
    }
    next();
}