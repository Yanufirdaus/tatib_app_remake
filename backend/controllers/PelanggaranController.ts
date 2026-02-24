import { Request, Response } from "express";
import { PelanggaranService } from "../services/PelanggaranService";
import { Messages } from "../constant/message";

export class PelanggaranController {
    static async addPelanggaran(req: Request, res: Response) {
        try {
            const pelanggaranData: AddPelanggaranDTO[] = req.body
                .filter((item: any) => item.jenisId && item.pelanggaran && item.poin !== undefined)
                .map((item: any) => ({
                    jenisId: item.jenisId,
                    pelanggaran: item.pelanggaran,
                    poin: item.poin,
            }));

            if (pelanggaranData.length === 0) {
                throw { status: 400, message: "Tidak ada data pelanggaran valid untuk disimpan" };
            }
            const newPelanggaran = await PelanggaranService.addPelanggaran(pelanggaranData);
            res.status(201).json(newPelanggaran);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async getPelanggaranByJenis(req: Request<{ jenisId: string }>, res: Response) {
        try {
            const jenisId = parseInt(req.params.jenisId);
            const pelanggaran = await PelanggaranService.getPelanggaranByJenisId(jenisId);
            res.json(pelanggaran);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async updatePelanggaran(req: Request<{ id: string }>, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const updatedData: UpdatePelanggaranDTO = req.body;
            const updatedPelanggaran = await PelanggaranService.updatePelanggaran(id, updatedData);
            res.json(updatedPelanggaran);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async deletePelanggaran(req: Request<{ id: string }>, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const deletedPelanggaran = await PelanggaranService.deletePelanggaran(id);
            res.json(deletedPelanggaran);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }
}