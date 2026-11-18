import { PelanggaranService } from "../services/PelanggaranService";
import { AppError } from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";
export class PelanggaranController {
    static addPelanggaran = catchAsync(async (req, res) => {
        const pelanggaranData = req.body.pelanggaran
            .filter((item) => item.jenisId && item.pelanggaran && item.poin !== undefined)
            .map((item) => ({
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
    static getAllJenisPelanggaran = catchAsync(async (req, res) => {
        const jenisPelanggaran = await PelanggaranService.getAllJenisPelanggaran();
        res.json(jenisPelanggaran);
    });
    static getPelanggaranByJenis = catchAsync(async (req, res) => {
        const jenisId = parseInt(req.params.jenisId);
        if (isNaN(jenisId)) {
            throw new AppError("Invalid Jenis Pelanggaran ID", 400);
        }
        const pelanggaran = await PelanggaranService.getPelanggaranByJenisId(jenisId);
        res.json(pelanggaran);
    });
    static updatePelanggaran = catchAsync(async (req, res) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new AppError("Invalid Pelanggaran ID", 400);
        }
        const updatedData = req.body;
        const updatedPelanggaran = await PelanggaranService.updatePelanggaran(id, updatedData);
        res.json(updatedPelanggaran);
    });
    static deletePelanggaran = catchAsync(async (req, res) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new AppError("Invalid Pelanggaran ID", 400);
        }
        const deletedPelanggaran = await PelanggaranService.deletePelanggaran(id);
        res.json(deletedPelanggaran);
    });
}
