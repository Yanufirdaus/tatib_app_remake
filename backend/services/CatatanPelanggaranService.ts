import { prisma } from "../lib/prisma";
import { AddCatatanPelanggaranDTO, AddManyCatatanPelanggaranDTO } from "../dto/catatan.pelanggaran.dto";
import { AppError } from "../utils/AppError";
import { CloudinaryService } from "./CloudinaryService";

export class CatatanPelanggaranService {
    static async addCatatanPelanggaran(input: AddCatatanPelanggaranDTO) {
        return await prisma.$transaction(async (tx) => {
            const pelanggaran = await tx.pelanggaran.findUnique({
                where: { id: input.idPelanggaran },
            });

            if (!pelanggaran) {
                throw new AppError("Pelanggaran tidak ditemukan", 404);
            }

            await tx.siswa.update({
                where: { profileId: input.idPelanggar },
                data: { poin: { increment: pelanggaran.poin } },
            });

            return await tx.catatanPelanggaran.create({
                data: {
                    idPelanggaran: input.idPelanggaran,
                    idPelanggar: input.idPelanggar,
                    idKelasPelanggar: input.idKelasPelanggar,
                    idPencatat: input.idPencatat,
                    bukti: input.bukti,
                    semester: input.semester,
                    time: input.time,
                    tahun_ajaran: input.tahun_ajaran,
                    note: input.note
                },
            });
        });
    }

    static async addManyCatatanPelanggaran(input: AddManyCatatanPelanggaranDTO) {
        return await prisma.$transaction(async (tx) => {
            const createdCatatan = [];

            const pelanggaran = await tx.pelanggaran.findUnique({
                where: { id: input.idPelanggaran },
            });

            if (!pelanggaran) {
                throw new AppError("Pelanggaran tidak ditemukan", 404);
            }

            for (const idPelanggar of input.idPelanggar) {
                await tx.siswa.update({
                    where: { profileId: idPelanggar },
                    data: { poin: { increment: pelanggaran.poin } },
                });

                const newCatatan = await tx.catatanPelanggaran.create({
                    data: {
                        idPelanggaran: input.idPelanggaran,
                        idPelanggar: idPelanggar,
                        idKelasPelanggar: input.idKelasPelanggar,
                        idPencatat: input.idPencatat,
                        bukti: input.bukti,
                        semester: input.semester,
                        time: input.time,
                        tahun_ajaran: input.tahun_ajaran,
                        note: input.note
                    },
                });
                createdCatatan.push(newCatatan);
            }

            return createdCatatan;
        });
    }

    static async getCatatanPelanggaranByPelanggar(idPelanggar: number) {
        const catatan = await prisma.catatanPelanggaran.findMany({
            where: {
                idPelanggar: idPelanggar,
            },
            orderBy: {
                time: "desc",
            },
            include: {
                pelanggaran: true,
                pelanggar: true,
                kelasPelanggar: true,
                pencatat: true,
            },
        });
        return catatan;
    }

    static async getCatatanPelanggaranRekap(idPelanggar: number, semester: string, tahun_ajaran: string) {
        const catatan = await prisma.catatanPelanggaran.findMany({
            where: {
                idPelanggar: idPelanggar,
                semester: semester,
                tahun_ajaran: tahun_ajaran
            },
            orderBy: {
                time: "desc",
            },
            include: {
                pelanggaran: true,
                pelanggar: true,
                kelasPelanggar: true,
                pencatat: true,
            },
        });
        return catatan;
    }

    static async deleteCatatanPelanggaran(catatanId: number) {
        const catatan = await prisma.catatanPelanggaran.findUnique({
            where: { id: catatanId }
        });

        if (!catatan) {
            throw new AppError("Catatan pelanggaran tidak ditemukan", 404);
        }

        const pelanggaran = await prisma.pelanggaran.findUnique({
            where: { id: catatan.idPelanggaran },
        });

        if (!pelanggaran) {
            throw new AppError("Pelanggaran tidak ditemukan", 404);
        }

        const result = await prisma.$transaction(async (tx) => {
            await tx.siswa.update({
                where: { profileId: catatan.idPelanggar },
                data: { poin: { decrement: pelanggaran.poin } },
            });

            return await tx.catatanPelanggaran.delete({
                where: { id: catatanId }
            });
        });

        // Delete evidence from Cloudinary if exists
        if (catatan.bukti) {
            await CloudinaryService.deleteFile(catatan.bukti);
        }

        return result;
    }
}