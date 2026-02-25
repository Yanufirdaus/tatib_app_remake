import { SemesterService } from "../services/SemesterService";
import { Messages } from "../constant/message";
import { Request, Response } from "express";

export class SemesterController {
    static async getCurrentSemester(req: Request, res: Response) {
        try {
            const currentSemester = await SemesterService.getCurrentSemester();
            res.json(currentSemester);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async updateCurrentSemester(req: Request, res: Response) {

        if (req.body.semester === undefined || req.body.tahun_ajaran === undefined) {
            return res.status(400).json({ message: "Semester and Tahun Ajaran are required" });
        }
        if (req.body.semester === "" || req.body.tahun_ajaran === "") {
            return res.status(400).json({ message: "Semester and Tahun Ajaran cannot be empty" });
        }
        
        try {
            const updateData: UpdateSemesterDTO = req.body;
            const updatedSemester = await SemesterService.updateCurrentSemester(updateData);
            res.json(updatedSemester);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }
}