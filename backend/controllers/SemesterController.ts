import { SemesterService } from "../services/SemesterService";
import { Request, Response } from "express";
import { UpdateSemesterDTO } from "../dto/semester.dto";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";

export class SemesterController {
    static getCurrentSemester = catchAsync(async (req: Request, res: Response) => {
        const currentSemester = await SemesterService.getCurrentSemester();
        res.json(currentSemester);
    });

    static updateCurrentSemester = catchAsync(async (req: Request, res: Response) => {
        const { semester, tahun_ajaran } = req.body;

        if (semester === undefined || tahun_ajaran === undefined) {
            throw new AppError("Semester and Tahun Ajaran are required", 400);
        }
        if (semester === "" || tahun_ajaran === "") {
            throw new AppError("Semester and Tahun Ajaran cannot be empty", 400);
        }

        const updateData: UpdateSemesterDTO = req.body;
        const updatedSemester = await SemesterService.updateCurrentSemester(updateData);
        res.json(updatedSemester);
    });
}