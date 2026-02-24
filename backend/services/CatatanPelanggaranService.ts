import { prisma } from "../lib/prisma";

export class CatatanPelanggaranService {
    static async addCatatanPelanggaran(input: AddCatatanPelanggaranDTO) {
        const pelanggaran = await prisma.pelanggaran.findUnique({
            where: { id: input.idPelanggaran },
        });

        if (!pelanggaran) {
            throw new Error("Pelanggaran tidak ditemukan");
        }

        await prisma.siswa.update({
            where: { profileId: input.idPelanggar },
            data: { poin: { increment: pelanggaran.poin } },
        });
        const newCatatan = await prisma.catatanPelanggaran.create({
            data: {
                idPelanggaran: input.idPelanggaran,
                idPelanggar: input.idPelanggar,
                idKelasPelanggar: input.idKelasPelanggar,
                idPencatat: input.idPencatat,
                bukti: input.bukti,
                semester: input.semester,
                time: input.time,
                tahun_ajaran: input.tahun_ajaran
            },
        });
        return newCatatan;
    }

    static async addManyCatatanPelanggaran(input: AddManyCatatanPelanggaranDTO) {
        const createdCatatan = [];

        for (const idPelanggar of input.idPelanggar) {
            const pelanggaran = await prisma.pelanggaran.findUnique({
                where: { id: input.idPelanggaran },
            });

            if (!pelanggaran) {
                throw new Error("Pelanggaran tidak ditemukan");
            }

            await prisma.siswa.update({
                where: { profileId: idPelanggar },
                data: { poin: { increment: pelanggaran.poin } },
            });
            const newCatatan = await prisma.catatanPelanggaran.create({
                data: {
                    idPelanggaran: input.idPelanggaran,
                    idPelanggar: idPelanggar,
                    idKelasPelanggar: input.idKelasPelanggar,
                    idPencatat: input.idPencatat,
                    bukti: input.bukti,
                    semester: input.semester,
                    time: input.time,
                    tahun_ajaran: input.tahun_ajaran,
                },
            });
            createdCatatan.push(newCatatan);
        }

        return createdCatatan;
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
            where: {
                id: catatanId
            }
        });

        if (!catatan) {
            throw new Error("Catatan pelanggaran tidak ditemukan");
        }

        const pelanggaran = await prisma.pelanggaran.findUnique({
            where: { id: catatan.idPelanggaran },
        });

        if (!pelanggaran) {
            throw new Error("Pelanggaran tidak ditemukan");
        }

        await prisma.siswa.update({
            where: { profileId: catatan.idPelanggar },
            data: { poin: { decrement: pelanggaran.poin } },
        });

        const deletedCatatan = await prisma.catatanPelanggaran.delete({
            where: {
                id: catatanId
            }
        });
        return deletedCatatan;
    }
}