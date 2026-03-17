import { CreateSiswaDTO, CreateTendikDTO } from "../dto/user.dto";
import { Siswa, Tendik, User } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import { AppError } from "../utils/AppError";
import { hashPassword } from "../utils/crypto";
import { jwtToken, verifyToken } from "../utils/jwt";
import { Messages } from "../constant/message";


export class AuthService {
  static async registerStudents(users: CreateSiswaDTO[]) {
    type CreatedStudent = {
      user: User;
      siswa: Siswa;
    };

    const nisns = users.map(u => u.nisn);
    const existingSiswa = await prisma.siswa.findMany({
      where: {
        nisn: { in: nisns }
      },
      select: { nisn: true }
    });

    if (existingSiswa.length > 0) {
      const duplicateNisns = existingSiswa.map(s => s.nisn).join(", ");
      throw new AppError(`NISN berikut sudah terdaftar: ${duplicateNisns}`, 400);
    }

    const createdStudents: CreatedStudent[] = [];

    await prisma.$transaction(async (tx) => {
      for (const [index, user] of users.entries()) {

        const hashedPassword = await hashPassword(user.password);

        const newUser = await tx.user.create({
          data: {
            name: user.name.toLowerCase(),
            password: hashedPassword,
            role: "siswa",
            image_profile: user.image_profile || null,
          },
        });

        const newSiswa = await tx.siswa.create({
          data: {
            kelasId: user.kelasId,
            nisn: user.nisn,
            profileId: newUser.id,
            poin: 0,
          },
        });

        createdStudents.push({ user: newUser, siswa: newSiswa });
      }
    });

    return createdStudents;
  }

  static async registerTendik(users: CreateTendikDTO[]) {
    type CreatedTendik = {
      user: User;
      tendik: Tendik;
    };

    const nips = users.map(u => u.nip);
    const existingTendik = await prisma.tendik.findMany({
      where: {
        nip: { in: nips }
      },
      select: { nip: true }
    });

    if (existingTendik.length > 0) {
      const duplicateNips = existingTendik.map(t => t.nip).join(", ");
      throw new AppError(`NIP berikut sudah terdaftar: ${duplicateNips}`, 400);
    }

    const createdTendik: CreatedTendik[] = [];

    await prisma.$transaction(async (tx) => {
      for (const [index, user] of users.entries()) {
        const hashedPassword = await hashPassword(user.password);

        const newUser = await tx.user.create({
          data: {
            name: user.name.toLowerCase(),
            password: hashedPassword,
            role: user.role,
            image_profile: user.image_profile || null,
          },
        });

        const newTendik = await tx.tendik.create({
          data: {
            profileId: newUser.id,
            nip: user.nip,
          },
        });

        createdTendik.push({ user: newUser, tendik: newTendik });
      }
    });

    return createdTendik;
  }

  static async refreshToken(token: string) {
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: token }
    });

    if (!storedToken) {
      throw new AppError("Invalid refresh token", 403);
    }

    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({
        where: { token }
      });
      throw new AppError("Refresh token expired", 403);
    }

    const user = await prisma.user.findUnique({
      where: { id: storedToken.userId }
    });


    if (!user) {
      throw new AppError(Messages.USER_NOT_FOUND, 404);
    }

    const decoded = verifyToken(token);
    const newToken = jwtToken({ id: decoded.id, role: decoded.role });

    return { newToken, user: { id: user.id, username: user.name, role: user.role } };
  }

  static async logout(token: string) {
    const tokensplitted = token;
    console.log("Received refresh token for logout:", tokensplitted);
    await prisma.refreshToken.deleteMany({
      where: { token: tokensplitted }
    });
  }

  static async me(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        role: true
      }
    })

    if (!user) {
      throw new AppError(Messages.USER_NOT_FOUND, 404);
    }

    return { user: { id: user.id, username: user.name, role: user.role } }
  }
}