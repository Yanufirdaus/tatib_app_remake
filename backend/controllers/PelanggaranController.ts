import { Request, Response } from "express";
import { PelanggaranService } from "../services/PelanggaranService";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";
import { AddPelanggaranDTO, UpdatePelanggaranDTO } from "../dto/pelanggaran.dto";

export class PelanggaranController {
    static addPelanggaran = catchAsync(async (req: Request, res: Response) => {
        const pelanggaranData: AddPelanggaranDTO[] = req.body.pelanggaran
            .filter((item: AddPelanggaranDTO) => item.jenisId && item.pelanggaran && item.poin !== undefined)
            .map((item: AddPelanggaranDTO) => ({
                jenisId: item.jenisId,
                pelanggaran: item.pelanggaran,
                poin: item.poin,
                nomor: item.nomor
            }));

        if (pelanggaranData.length === 0) {
            throw new AppError("Tidak ada data pelanggaran valid untuk disimpan", 400);
        }
        const newPelanggaran = await PelanggaranService.addPelanggaran(pelanggaranData);
        res.status(201).json(newPelanggaran);
    });

    static getAllJenisPelanggaran = catchAsync(async (req: Request, res: Response) => {
        const jenisPelanggaran = await PelanggaranService.getAllJenisPelanggaran();
        res.json(jenisPelanggaran);
    });

    static getPelanggaranByJenis = catchAsync(async (req: Request<{ jenisId: string }>, res: Response) => {
        const jenisId = parseInt(req.params.jenisId);
        if (isNaN(jenisId)) {
            throw new AppError("Invalid Jenis Pelanggaran ID", 400);
        }
        const pelanggaran = await PelanggaranService.getPelanggaranByJenisId(jenisId);
        res.json(pelanggaran);
    });

    static updatePelanggaran = catchAsync(async (req: Request<{ id: string }>, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new AppError("Invalid Pelanggaran ID", 400);
        }
        const updatedData: UpdatePelanggaranDTO = req.body;
        const updatedPelanggaran = await PelanggaranService.updatePelanggaran(id, updatedData);
        res.json(updatedPelanggaran);
    });

    static deletePelanggaran = catchAsync(async (req: Request<{ id: string }>, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new AppError("Invalid Pelanggaran ID", 400);
        }
        const deletedPelanggaran = await PelanggaranService.deletePelanggaran(id);
        res.json(deletedPelanggaran);
    });
}