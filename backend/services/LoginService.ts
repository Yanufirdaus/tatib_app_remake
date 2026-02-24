import { Messages } from "../constant/message";
import { prisma } from "../lib/prisma";
import { verifyPassword } from "../utils/crypto";
import { jwtToken, refreshToken } from "../utils/jwt";

export class LoginService {
    private static async findUserByIdentifier(tx: any, nomorInduk: string) {
        const siswa = await tx.siswa.findFirst({
            where: {
                nisn: nomorInduk
            }
        });

        const tendik = await tx.tendik.findFirst({
            where: {
                nip: nomorInduk
            }
        });

        if (!siswa && !tendik) {
            throw { status: 404, message: Messages.USER_NOT_FOUND };
        }

        const profileId = siswa
            ? siswa.profileId
            : tendik!.profileId;
            
        const user = await tx.user.findUnique({
            where: { id: profileId }
        });

        
        if (!user) {
            throw { status: 404, message: Messages.USER_NOT_FOUND };
        }

        return user;
    }

    private static async checkUserLockout(user: any) {
        if (user.lockoutUntil && user.lockoutUntil > new Date()) {
            const diffMs = user.lockoutUntil.getTime() - Date.now();

            const totalSeconds = Math.ceil(diffMs / 1000);

            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            throw {
                status: 403,
                message: `Akun terkunci. Coba lagi dalam ${minutes} menit ${seconds} detik`
            };
        }
    }

    private static async validatePassword (tx: any, user: any, inputPassword: string) {
        const isPasswordValid = await verifyPassword(user!.password, inputPassword);

        if (!isPasswordValid) {
            const MAX_ATTEMPTS = 3;
            const LOCK_MINUTES = 3;

            if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
                const lockUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
                await tx.user.update({
                    where: { id: user.id },
                    data: {
                        failedLoginAttempts: 0,
                        lockoutUntil: lockUntil
                    }
                });
                throw { status: 401, message: Messages.ACCOUNT_LOCKED };
            } 
            
            if (user.failedLoginAttempts < MAX_ATTEMPTS) {
                await tx.user.update({
                    where: { id: user.id },
                    data: {
                        failedLoginAttempts: {
                            increment: 1
                        }
                    }
                });

                console.log(user.id, user.failedLoginAttempts + 1);

                throw { status: 401, message: Messages.WRONG_PASSWORD + ` (${user.failedLoginAttempts + 1}/${MAX_ATTEMPTS})` };
            }

            await tx.user.update({
                where: { id: user.id },
                data: {
                    failedLoginAttempts: user.failedLoginAttempts + 1
                }
            });

            throw { status: 401, message: Messages.WRONG_PASSWORD };
        }
    }

    private static generateTokens(user: any) {
        const accessToken = jwtToken({ id: user.id, role: user.role });
        const refreshTokenValue = refreshToken({ id: user.id, role: user.role });

        return { accessToken, refreshToken: refreshTokenValue };
    }

    private static async saveRefreshToken(tx: any, userId: number, token: string) {
        await tx.refreshToken.create({
            data: {
                token,
                userId,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
    }

    private static async resetLoginAttempts(tx: any, userId: number) {
        await tx.user.update({
            where: { id: userId },
            data: {
                failedLoginAttempts: 0,
                lockoutUntil: null,
            },
        });
    }

    static async login(login_input: LoginDTO) {

        return await prisma.$transaction(async (tx) => {
            const user = await this.findUserByIdentifier(tx, login_input.nomor_induk);

            await this.checkUserLockout(user);
            
            await this.validatePassword(tx, user, login_input.password);

            const tokens = this.generateTokens(user);

            await this.saveRefreshToken(tx, user.id, tokens.refreshToken);

            await this.resetLoginAttempts(tx, user.id);
            
            return { user, ...tokens };
        });
    }
}