import { Messages } from "../constant/message";
import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";

export class UserController {
    static getSiswaById = catchAsync(async (req: Request<{ id: string }>, res: Response) => {
        const siswaId = parseInt(req.params.id);
        if (isNaN(siswaId)) {
            throw new AppError("Invalid Siswa ID", 400);
        }
        const siswa = await UserService.getSiswaById(siswaId);
        if (!siswa) {
            throw new AppError("Siswa tidak ditemukan", 404);
        }
        res.json(siswa);
    });

    static getSiswaByKelas = catchAsync(async (req: Request<{ kelasId: string }>, res: Response) => {
        const kelasId = parseInt(req.params.kelasId);
        if (isNaN(kelasId)) {
            throw new AppError("Invalid Kelas ID", 400);
        }
        const siswaList = await UserService.getSiswaByKelasId(kelasId);
        res.json(siswaList);
    });

    static getTendikById = catchAsync(async (req: Request<{ id: string }>, res: Response) => {
        const tendikId = parseInt(req.params.id);
        if (isNaN(tendikId)) {
            throw new AppError("Invalid Tendik ID", 400);
        }
        const tendik = await UserService.getTendikById(tendikId);
        if (!tendik) {
            throw new AppError("Tendik tidak ditemukan", 404);
        }
        res.json(tendik);
    });

    static getTendikByRole = catchAsync(async (req: Request<{ role: string }>, res: Response) => {
        const role = req.params.role;
        const tendikList = await UserService.getTendikByrole(role);
        res.json(tendikList);
    });

    static updateSiswa = catchAsync(async (req: Request<{ id: string }>, res: Response) => {
        const siswaId = parseInt(req.params.id);
        if (isNaN(siswaId)) {
            throw new AppError("Invalid Siswa ID", 400);
        }
        const updateData = req.body;
        const updatedSiswa = await UserService.updateSiswa(siswaId, updateData);
        res.json(updatedSiswa);
    });

    static updateManySiswaKelas = catchAsync(async (req: Request<{ kelasId: string }>, res: Response) => {
        const updateData = req.body;
        const updatedSiswa = await UserService.updateManySiswaKelas(updateData);
        res.json(updatedSiswa);
    });

    static updateTendik = catchAsync(async (req: Request<{ id: string }>, res: Response) => {
        const tendikId = parseInt(req.params.id);
        if (isNaN(tendikId)) {
            throw new AppError("Invalid Tendik ID", 400);
        }
        const updateData = req.body;
        const updatedTendik = await UserService.updateTendik(tendikId, updateData);
        res.json(updatedTendik);
    });

    static deleteSiswa = catchAsync(async (req: Request<{ id: string }>, res: Response) => {
        const siswaId = parseInt(req.params.id);
        if (isNaN(siswaId)) {
            throw new AppError("Invalid Siswa ID", 400);
        }
        await UserService.deleteSiswa(siswaId);
        res.json({ message: "Siswa berhasil dihapus" });
    });

    static deleteTendik = catchAsync(async (req: Request<{ id: string }>, res: Response) => {
        const tendikId = parseInt(req.params.id);
        if (isNaN(tendikId)) {
            throw new AppError("Invalid Tendik ID", 400);
        }
        await UserService.deleteTendik(tendikId);
        res.json({ message: "Tendik berhasil dihapus" });
    });
}