import { CatatanPelanggaranService } from "../services/CatatanPelanggaranService";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
export class CatatanPelanggaranController {
    static addCatatanPelanggaran = catchAsync(async (req, res) => {
        const input = req.body;
        const newCatatan = await CatatanPelanggaranService.addCatatanPelanggaran(input);
        res.status(201).json(newCatatan);
    });
    static addManyCatatanPelanggaran = catchAsync(async (req, res) => {
        const input = req.body;
        const createdCatatan = await CatatanPelanggaranService.addManyCatatanPelanggaran(input);
        res.status(201).json(createdCatatan);
    });
    static getCatatanPelanggaranByPelanggar = catchAsync(async (req, res) => {
        const idPelanggar = parseInt(String(req.params.idPelanggar));
        if (isNaN(idPelanggar)) {
            throw new AppError("Invalid Pelanggar ID", 400);
        }
        const catatan = await CatatanPelanggaranService.getCatatanPelanggaranByPelanggar(idPelanggar);
        res.json(catatan);
    });
    static getCatatanPelanggaranRekap = catchAsync(async (req, res) => {
        const idPelanggar = parseInt(req.params.idPelanggar);
        if (isNaN(idPelanggar)) {
            throw new AppError("Invalid Pelanggar ID", 400);
        }
        const semester = req.query.semester;
        const tahun_ajaran = req.query.tahun_ajaran;
        const catatan = await CatatanPelanggaranService.getCatatanPelanggaranRekap(idPelanggar, semester, tahun_ajaran);
        res.json(catatan);
    });
    static deleteCatatanPelanggaran = catchAsync(async (req, res) => {
        const catatanId = parseInt(String(req.params.id));
        if (isNaN(catatanId)) {
            throw new AppError("Invalid Catatan ID", 400);
        }
        const deletedCatatan = await CatatanPelanggaranService.deleteCatatanPelanggaran(catatanId);
        res.json(deletedCatatan);
    });
}
