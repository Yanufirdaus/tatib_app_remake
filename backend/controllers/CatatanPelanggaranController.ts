import { Request, Response } from "express";
import { CatatanPelanggaranService } from "../services/CatatanPelanggaranService";
import { AddCatatanPelanggaranDTO, AddManyCatatanPelanggaranDTO } from "../dto/catatan.pelanggaran.dto";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";

export class CatatanPelanggaranController {
    static addCatatanPelanggaran = catchAsync(async (req: Request, res: Response) => {
        const input: AddCatatanPelanggaranDTO = req.body;
        const newCatatan = await CatatanPelanggaranService.addCatatanPelanggaran(input);
        res.status(201).json(newCatatan);
    });

    static addManyCatatanPelanggaran = catchAsync(async (req: Request, res: Response) => {
        const input: AddManyCatatanPelanggaranDTO = req.body;
        const createdCatatan = await CatatanPelanggaranService.addManyCatatanPelanggaran(input);
        res.status(201).json(createdCatatan);
    });

    static getCatatanPelanggaranByPelanggar = catchAsync(async (req: Request, res: Response) => {
        const idPelanggar = parseInt(String(req.params.idPelanggar));
        if (isNaN(idPelanggar)) {
            throw new AppError("Invalid Pelanggar ID", 400);
        }
        const catatan = await CatatanPelanggaranService.getCatatanPelanggaranByPelanggar(idPelanggar);
        res.json(catatan);
    });

    static getCatatanPelanggaranRekap = catchAsync(async (req: Request, res: Response) => {
        const idPelanggar = parseInt(req.params.idPelanggar as string);
        if (isNaN(idPelanggar)) {
            throw new AppError("Invalid Pelanggar ID", 400);
        }
        const semester = req.query.semester as string;
        const tahun_ajaran = req.query.tahun_ajaran as string;
        const catatan = await CatatanPelanggaranService.getCatatanPelanggaranRekap(idPelanggar, semester, tahun_ajaran);
        res.json(catatan);
    });

    static deleteCatatanPelanggaran = catchAsync(async (req: Request, res: Response) => {
        const catatanId = parseInt(String(req.params.id));
        if (isNaN(catatanId)) {
            throw new AppError("Invalid Catatan ID", 400);
        }
        const deletedCatatan = await CatatanPelanggaranService.deleteCatatanPelanggaran(catatanId);
        res.json(deletedCatatan);
    });
}