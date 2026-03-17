import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { Messages } from '../constant/message';
import { LoginService } from '../services/LoginService';
import { CreateSiswaDTO, CreateTendikDTO, LoginDTO } from '../dto/user.dto';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';

export class AuthController {
    static registerStudents = catchAsync(async (req: Request<{}, {}, { siswa: CreateSiswaDTO[] }>, res: Response) => {
        const users = req.body.siswa;
        const createdStudents = await AuthService.registerStudents(users);
        res.status(201).json(createdStudents);
    });

    static registerTendik = catchAsync(async (req: Request<{}, {}, { tendik: CreateTendikDTO[] }>, res: Response) => {
        const users = req.body.tendik;
        const createdTendik = await AuthService.registerTendik(users);
        res.status(201).json(createdTendik);
    });

    static login = catchAsync(async (req: Request<{}, {}, LoginDTO>, res: Response) => {
        const login_input = req.body;
        const result = await LoginService.login(login_input);
        const { user, accessToken, refreshToken: refreshTokenValue } = result;

        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "none"
        });

        res.cookie("refreshToken", refreshTokenValue, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none"
        });

        res.json({
            message: Messages.LOGIN_SUCCESS,
            user: { id: user.id, role: user.role }
        });
    });

    static refreshToken = catchAsync(async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new AppError("Refresh token is required", 401);
        }

        const result = await AuthService.refreshToken(refreshToken!);

        res.cookie("token", result.newToken, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 1000,
            sameSite: "none"
        });

        res.json({
            message: Messages.LOGIN_SUCCESS,
            user: { id: result.user.id, username: result.user.username, role: result.user.role }
        });
    });

    static logout = catchAsync(async (req: Request, res: Response) => {
        const refreshToken = req.headers["refreshtoken"] || req.cookies.refreshToken;

        if (!refreshToken) {
            throw new AppError("Refresh token is required", 401);
        }

        await AuthService.logout(String(refreshToken));

        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.status(200).json({ message: Messages.LOGOUT_SUCCESS });
    });

    static me = catchAsync(async (req: Request, res: Response) => {
        const userId = req.user?.id

        if (!userId) {
            throw new AppError(Messages.NIP_REQUIRED, 401);
        }

        const result = await AuthService.me(userId);
        res.status(200).json({ id: result.user.id, username: result.user.username, role: result.user.role });
    });
}