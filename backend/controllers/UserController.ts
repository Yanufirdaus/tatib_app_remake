import { Messages } from "../constant/message";
import { UserService } from "../services/UserService";
import { Request, Response } from "express";

export class UserController {
    static async getSiswaById(req: Request<{ id: string }>, res: Response) {
        try {
            const siswaId = parseInt(req.params.id);
            const siswa = await UserService.getSiswaById(siswaId);
            if (!siswa) {
                return res.status(404).json({ message: "Siswa tidak ditemukan" });
            }
            res.json(siswa);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async getSiswaByKelas(req: Request<{ kelasId: string }>, res: Response) {
        try {
            const kelasId = parseInt(req.params.kelasId);

            const siswaList = await UserService.getSiswaByKelasId(kelasId);
            res.json(siswaList);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async getTendikById(req: Request<{ id: string }>, res: Response) {
        try {
            const tendikId = parseInt(req.params.id);
            const tendik = await UserService.getTendikById(tendikId);
            if (!tendik) {
                return res.status(404).json({ message: "Tendik tidak ditemukan" });
            }
            res.json(tendik);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    
    }

    static async getTendikByRole(req: Request<{ role: string }>, res: Response) {
        try {
            const role = req.params.role;
            const tendikList = await UserService.getTendikByrole(role);
            res.json(tendikList);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async updateSiswa(req: Request<{ id: string }>, res: Response) {
        try {
            const siswaId = parseInt(req.params.id);
            const updateData = req.body;
            const updatedSiswa = await UserService.updateSiswa(siswaId, updateData);
            res.json(updatedSiswa);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async updateTendik(req: Request<{ id: string }>, res: Response) {
        try {
            const tendikId = parseInt(req.params.id);
            const updateData = req.body;
            const updatedTendik = await UserService.updateTendik(tendikId, updateData);
            res.json(updatedTendik);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }
}