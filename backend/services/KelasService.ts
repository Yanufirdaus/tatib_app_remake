import { prisma } from "../lib/prisma";
import { CreateKelasDTO, CreateManyKelasDTO } from "../dto/user.dto";
import { AppError } from "../utils/AppError";

export class KelasService {
    static async getAllKelas() {
        const kelas = await prisma.kelas.findMany({
            orderBy: [
                { grade: "asc" },
                { name: "asc" }
            ]
        });
        return kelas;
    }

    static async getKelasById(kelasId: number) {
        const kelas = await prisma.kelas.findUnique({
            where: {
                id: kelasId
            }
        });
        return kelas;
    }

    static async createKelas(kelas: CreateKelasDTO) {
        const newKelas = await prisma.kelas.create({
            data: {
                grade: kelas.grade,
                name: kelas.name.toLowerCase()
            }
        });
        return { message: "Kelas created successfully", data: newKelas };
    }

    static async createManyKelasNew(input: CreateManyKelasDTO) {
        const normalizedKelas = input.kelas.map(k => ({
            ...k,
            name: k.name.toLowerCase().trim()
        }));

        const names = normalizedKelas.map(k => k.name);

        const existing = await prisma.kelas.findMany({
            where: { name: { in: names } },
            select: { name: true }
        });

        const existingNames = existing.map(k => k.name.toLowerCase());

        if (existingNames.length > 0) {
            throw new AppError("Beberapa kelas yang ditambahkan sudah ada", 400);
        }

        const created = await prisma.kelas.createMany({
            data: normalizedKelas,
            skipDuplicates: true
        });
        return { message: "Kelas added successfully", data: created };
    }

    static async deleteKelas(kelasId: number) {
        const kelas = await this.getKelasById(kelasId);
        if (!kelas) {
            throw new AppError("Kelas not found", 404);
        }

        const siswaCount = await prisma.siswa.count({
            where: {
                kelasId: kelasId
            }
        });

        if (siswaCount > 0) {
            throw new AppError("Kelas tidak dapat dihapus karena masih memiliki siswa", 400);
        }

        const deletedKelas = await prisma.kelas.delete({
            where: {
                id: kelasId
            }
        });
        return { message: "Kelas deleted successfully", data: deletedKelas };
    }
}