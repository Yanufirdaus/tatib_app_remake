import { Messages } from "../constant/message";
import { CatatanPelanggaranService } from "../services/CatatanPelanggaranService";

export class CatatanPelanggaranController {
    static async addCatatanPelanggaran(req: any, res: any) {
        try {
            const input: AddCatatanPelanggaranDTO = req.body;
            const newCatatan = await CatatanPelanggaranService.addCatatanPelanggaran(input);
            res.status(201).json(newCatatan);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async addManyCatatanPelanggaran(req: any, res: any) {
        try {
            const input: AddManyCatatanPelanggaranDTO = req.body;
            const createdCatatan = await CatatanPelanggaranService.addManyCatatanPelanggaran(input);
            res.status(201).json(createdCatatan);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async getCatatanPelanggaranByPelanggar(req: any, res: any) {
        try {
            const idPelanggar = parseInt(req.params.idPelanggar);
            const catatan = await CatatanPelanggaranService.getCatatanPelanggaranByPelanggar(idPelanggar);
            res.json(catatan);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async getCatatanPelanggaranRekap(req: any, res: any) {
        try {
            const idPelanggar = parseInt(req.params.idPelanggar);
            const semester = req.query.semester as string;
            const tahun_ajaran = req.query.tahun_ajaran as string;
            const catatan = await CatatanPelanggaranService.getCatatanPelanggaranRekap(idPelanggar, semester, tahun_ajaran);
            res.json(catatan);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async deleteCatatanPelanggaran(req: any, res: any) {
        try {
            const catatanId = parseInt(req.params.id);
            const deletedCatatan = await CatatanPelanggaranService.deleteCatatanPelanggaran(catatanId);
            res.json(deletedCatatan);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }
}