import { prisma } from "../lib/prisma";

export class KelasService {
    static async getAllKelas() {
        const kelas = await prisma.kelas.findMany({
            orderBy: [
                {grade: "asc"},
                {name: "asc"}
            ]
        });
        return kelas;
    }
    
    static async createKelas (kelas: CreateKelasDTO) {
        const newKelas = await prisma.kelas.create({
            data: {
                grade: kelas.grade,
                name: kelas.name
            }
        });
        return {message: "Kelas created successfully", data: newKelas};
    }

    static async createManyKelas(kelasList: CreateKelasDTO[]) {
        const createdKelas = await prisma.kelas.createMany({
            data: kelasList.map(kelas => ({
                grade: kelas.grade,
                name: kelas.name
            })),
            skipDuplicates: true
        });
        return {message: "Kelas created successfully", data: createdKelas};
    }

    static async deleteKelas(kelasId: number) {
        const deletedKelas = await prisma.kelas.delete({
            where: {
                id: kelasId
            }
        });
        return {message: "Kelas deleted successfully", data: deletedKelas};
    }
}