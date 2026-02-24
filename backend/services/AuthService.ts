import * as argon2 from "argon2";
import { prisma } from "../lib/prisma";
import { jwtToken, verifyToken } from "../utils/jwt";
import { Messages } from "../constant/message";
import { hashPassword } from "../utils/crypto";
import { Siswa, User } from "../generated/prisma/browser";


export class AuthService {

  static async registerStudents(users: CreateSiswaDTO[]) {
    // validateStudentInput(users);

    type CreatedStudent = {
        user: User;
        siswa: Siswa;
    };

    const createdStudents: CreatedStudent[] = [];

    await prisma.$transaction(async (tx) => {
      for (const [index, user] of users.entries()) {

        const hashedPassword = await hashPassword(user.password);

        const newUser = await tx.user.create({
          data: {
            name: user.name,
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
    // validateTendikInput(users);

    type CreatedTendik = {
        user: User;
        tendik: any;
    };

    const createdTendik: CreatedTendik[] = [];

    await prisma.$transaction(async (tx) => {
        for (const [index, user] of users.entries()) {
            const hashedPassword = await hashPassword(user.password);

            const newUser = await tx.user.create({
                data: {
                    name: user.name,
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
    const tokensplitted = token.split(" ")[1];
    // console.log("Received refresh token:", token);
    // console.log("Received refresh token splitted:", tokensplitted);
    const storedToken = await prisma.refreshToken.findUnique({
        where: { token: tokensplitted    }
    });

    console.log("Stored token:", storedToken);

    if (!storedToken) {
        throw { status: 401, message: "Invalid refresh token" };
    }

    if (storedToken.expiresAt < new Date()) {
        await prisma.refreshToken.delete({
            where: { token }
        });
        throw { status: 401, message: "Refresh token expired" };
    }

    const user = await prisma.user.findUnique({
        where: { id: storedToken.userId }
    });

    
    if (!user) {
        throw { status: 404, message: Messages.USER_NOT_FOUND };
    }

    const decoded: any = verifyToken(tokensplitted);
    const newToken = jwtToken( {id: decoded.id, role: decoded.role} );

    return { newToken, user: { id: user.id, username: user.name } };
  }

  static async logout(token: string) {
    const tokensplitted = token;
    console.log("Received refresh token for logout:", tokensplitted);
    await prisma.refreshToken.delete({
        where: { token: tokensplitted }
    });
  }
}