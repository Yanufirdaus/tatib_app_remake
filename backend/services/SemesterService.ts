import { prisma } from "../lib/prisma";

export class SemesterService {
    static async getCurrentSemester() {
        const currentSemester = await prisma.semester.findFirst({});
        return currentSemester;
    }

    static async updateCurrentSemester(data: UpdateSemesterDTO) {
        const updatedSemester = await prisma.semester.update({
            where: { id: 1 },
            data: {
                semester: data.semester,
                tahun_ajaran: data.tahun_ajaran,
            },
        });
        return updatedSemester;
    }
}