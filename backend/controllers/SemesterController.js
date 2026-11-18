import { SemesterService } from "../services/SemesterService";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/AppError";
export class SemesterController {
    static getCurrentSemester = catchAsync(async (req, res) => {
        const currentSemester = await SemesterService.getCurrentSemester();
        res.json(currentSemester);
    });
    static updateCurrentSemester = catchAsync(async (req, res) => {
        const { semester, tahun_ajaran } = req.body;
        if (semester === undefined || tahun_ajaran === undefined) {
            throw new AppError("Semester and Tahun Ajaran are required", 400);
        }
        if (semester === "" || tahun_ajaran === "") {
            throw new AppError("Semester and Tahun Ajaran cannot be empty", 400);
        }
        const updateData = req.body;
        const updatedSemester = await SemesterService.updateCurrentSemester(updateData);
        res.json(updatedSemester);
    });
}
