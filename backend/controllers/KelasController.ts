import { Messages } from "../constant/message";
import { KelasService } from "../services/KelasService";
import { Request, Response } from "express";

export class KelasController {
    static async getAllKelas(req: Request, res: Response) {
        try {
            const kelas = await KelasService.getAllKelas();
            res.json(kelas);
        } catch (err:any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async createKelas(req: Request<{}, {}, CreateKelasDTO>, res: Response) {
        try {
            const kelasInput = req.body;
            const newKelas = await KelasService.createKelas(kelasInput);
            res.status(201).json(newKelas);
        } catch (err:any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async createManyKelas(req: Request<{}, {}, CreateKelasDTO[]>, res: Response) {
        try {
            const kelasList = req.body;
            const createdKelas = await KelasService.createManyKelas(kelasList);
            res.status(201).json(createdKelas);
        } catch (err:any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async deleteKelas(req: Request<{ id: string }>, res: Response) {
        try {
            const kelasId = parseInt(req.params.id);
            const deletedKelas = await KelasService.deleteKelas(kelasId);
            res.json(deletedKelas);
        } catch (err:any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }
}