import { prisma } from "../lib/prisma";

export class PelanggaranService {
    static async addPelanggaran( pelanggaran: AddPelanggaranDTO[] ) {
        const newPelanggaran = await prisma.pelanggaran.createMany({
                data: pelanggaran.map(item => ({
                jenisId: item.jenisId,
                pelanggaran: item.pelanggaran,
                poin: item.poin,
            })),
        });
        return newPelanggaran;
    }

    static async getPelanggaranByJenisId(jenisId: number) {
        const pelanggaran = await prisma.pelanggaran.findMany({
            where: { jenisId: jenisId },
        });
        return pelanggaran;
    }

    static async updatePelanggaran(id: number, data: UpdatePelanggaranDTO) {
        const updatedPelanggaran = await prisma.pelanggaran.update({
            where: { id: id },
            data: {
                pelanggaran: data.pelanggaran,
                poin: data.poin,
            },
        });
        return updatedPelanggaran;
    }

    static async deletePelanggaran(id: number) {
        const deletedPelanggaran = await prisma.pelanggaran.delete({
            where: { id: id },
        });
        return deletedPelanggaran;
    }
}