import { prisma } from "../lib/prisma";
import { hashPassword } from "../utils/crypto";
import { UpdateUserDTO, UpdateManySiswaKelasDTO, UpdateTendikDTO } from "../dto/user.dto";
import { AppError } from "../utils/AppError";

export class UserService {
    static async getSiswaById(id: number) {
        const siswa = await prisma.siswa.findUnique({
            where: { id: id },
            include: {
                profileSiswa: true,
                kelas: true,
            },
        });
        return siswa;
    }

    static async getSiswaByKelasId(kelasId: number) {
        const siswaList = await prisma.siswa.findMany({
            where: { kelasId: kelasId },
            include: {
                profileSiswa: true,
                kelas: true,
            },
            orderBy: {
                profileSiswa: {
                    name: "asc",
                },
            },
        });
        return siswaList;
    }

    static async getTendikById(id: number) {
        const tendik = await prisma.tendik.findUnique({
            where: { id: id },
            include: {
                profileSiswa: true,
            },
        });
        return tendik;
    }

    static async getTendikByrole(role: string) {
        const tendik = await prisma.tendik.findMany({
            where: { profileSiswa: { role: role } },
            include: {
                profileSiswa: true,
            },
        });
        return tendik;
    }

    static async updateSiswa(id: number, data: UpdateUserDTO) {
        const siswa = await this.getSiswaById(id);
        if (!siswa) {
            throw new AppError("Siswa not found", 404);
        }

        console.log("Updating siswa with data:", data);

        const hashedPassword = await hashPassword(String(data.nisn));

        const updatedSiswa = await prisma.siswa.update({
            where: { id: id },
            data: {
                nisn: String(data.nisn),
                kelas: {
                    connect: { id: Number(data.kelasId) },
                },
                profileSiswa: {
                    update: {
                        name: data.name.toLowerCase(),
                        password: hashedPassword,
                    },
                },
            },
            include: {
                profileSiswa: true,
                kelas: true,
            },
        });


        return updatedSiswa;
    }

    static async updateManySiswaKelas(data: UpdateManySiswaKelasDTO) {
        const result = await prisma.$transaction(
            data.kelasUpdate.map((siswaId, index) =>
                prisma.siswa.update({
                    where: { id: Number(siswaId.siswaIds) },
                    data: {
                        kelasId: Number(siswaId.kelasIds),
                    },
                })
            )
        );

        return result;
    }

    static async updateTendik(id: number, data: UpdateTendikDTO) {
        const tendik = await this.getTendikById(id);
        if (!tendik) {
            throw new AppError("Tendik not found", 404);
        }

        const updatedTendik = await prisma.tendik.update({
            where: { id: id },
            data: {
                nip: data.nip,
                profileSiswa: {
                    update: {
                        name: data.name.toLowerCase(),
                        role: data.role.toLowerCase(),
                        password: data.nip
                    },
                },
            },
            include: {
                profileSiswa: true,
            },
        });
        return updatedTendik;
    }

    static async deleteSiswa(id: number) {
        const siswa = await this.getSiswaById(id);

        if (!siswa) {
            throw new AppError("Siswa not found", 404);
        }

        const profileId = siswa.profileSiswa.id;

        // 1. Get all file URLs to delete later
        const catatanList = await prisma.catatanPelanggaran.findMany({
            where: { idPelanggar: profileId },
            select: { bukti: true },
        });
        const fileUrls = catatanList.map(c => c.bukti);

        // 2. Perform DB operations in a transaction
        const result = await prisma.$transaction(async (tx) => {
            const deleteCatatan = await tx.catatanPelanggaran.deleteMany({
                where: { idPelanggar: profileId },
            });

            const deletedSiswa = await tx.siswa.delete({
                where: { id: id },
            });

            const deletedProfile = await tx.user.delete({
                where: { id: profileId },
            });

            return { deletedSiswa, deletedProfile, deleteCatatan };
        });

        // 3. Delete from Cloudinary after DB success
        const { CloudinaryService } = await import("./CloudinaryService");
        await CloudinaryService.deleteMultipleFiles(fileUrls);

        return result;
    }

    static async deleteTendik(id: number) {
        const tendik = await this.getTendikById(id);

        if (!tendik) {
            throw new AppError("Tendik not found", 404);
        }

        return await prisma.$transaction(async (tx) => {
            const deletedTendik = await tx.tendik.delete({
                where: { id: id },
            });

            const deletedProfile = await tx.user.delete({
                where: { id: deletedTendik.profileId },
            });

            return { deletedTendik, deletedProfile };
        });
    }
}