import { profile } from "node:console";
import { prisma } from "../lib/prisma";

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
        console.log("Updating siswa with data:", data);
        const updatedSiswa = await prisma.siswa.update({
            where: { id: id },
            data: {
                kelas: {          // bukan kelasId langsung
                    connect: { id: data.kelasId },  // connect ke kelas baru
                },
                profileSiswa: {
                    update: {
                        name: data.name,
                        image_profile: data.image_profile,
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

    static async updateTendik(id: number, data: UpdateTendikDTO) {
        const updatedTendik = await prisma.tendik.update({
            where: { id: id },
            data: {
                profileSiswa: {
                    update: {
                        name: data.name,
                        image_profile: data.image_profile,
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
        const getSiswaById = await this.getSiswaById(id);

        if (!getSiswaById) {
            throw { status: 404, message: "Siswa not found" };
        }
        const profileId = getSiswaById.profileSiswa.id;

        console.log(id, profileId);

        const deleteCatatanPelanggaran = await prisma.catatanPelanggaran.deleteMany({
            where: { idPelanggar: profileId },
        });

        const deleteSiswa = await prisma.siswa.delete({
            where: { id: id },
            include: {
                profileSiswa: true,
            },
        });

        const deleteProfileSiswa = await prisma.user.delete({
            where: { id: profileId },
        });

        return { deleteSiswa, deleteProfileSiswa, deleteCatatanPelanggaran };
    }

    static async deleteTendik(id: number) {
        const deleteTendik = await prisma.tendik.delete({
            where: { id: id },
            include: {  
                profileSiswa: true,
            },
        });

        const deleteProfileTendik = await prisma.user.delete({
            where: { id: deleteTendik.profileSiswa.id },
        });
        return { deleteTendik, deleteProfileTendik };
    }
}