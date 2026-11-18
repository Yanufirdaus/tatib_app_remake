import { KelasService } from "../services/KelasService";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
export class KelasController {
    static getAllKelas = catchAsync(async (req, res) => {
        const kelas = await KelasService.getAllKelas();
        res.json(kelas);
    });
    static getKelasById = catchAsync(async (req, res) => {
        const kelasId = parseInt(req.params.id);
        if (isNaN(kelasId)) {
            throw new AppError("Invalid Kelas ID", 400);
        }
        const kelas = await KelasService.getKelasById(kelasId);
        res.json(kelas);
    });
    static createKelas = catchAsync(async (req, res) => {
        const kelasInput = req.body;
        const newKelas = await KelasService.createKelas(kelasInput);
        res.status(201).json(newKelas);
    });
    static createManyKelasNew = catchAsync(async (req, res) => {
        const created = await KelasService.createManyKelasNew(req.body);
        res.status(201).json({
            message: "Kelas berhasil ditambahkan",
            data: created
        });
    });
    static deleteKelas = catchAsync(async (req, res) => {
        const kelasId = parseInt(req.params.id);
        if (isNaN(kelasId)) {
            throw new AppError("Invalid Kelas ID", 400);
        }
        const deletedKelas = await KelasService.deleteKelas(kelasId);
        res.json(deletedKelas);
    });
}
