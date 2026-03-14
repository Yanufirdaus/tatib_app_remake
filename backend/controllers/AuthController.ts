import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { Messages } from '../constant/message';
import { LoginService } from '../services/LoginService';
import { CreateSiswaDTO, CreateTendikDTO, LoginDTO } from '../dto/user.dto';

export class AuthController {
    static async registerStudents(req: Request<{}, {}, { siswa: CreateSiswaDTO[] }>, res: Response) {
        try {
            const users = req.body.siswa;

            console.log("Received registration data:", users);

            const createdStudents = await AuthService.registerStudents(users);
            return res.status(201).json(createdStudents);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async registerTendik(req: Request<{}, {}, CreateTendikDTO[]>, res: Response) {
        try {
            const users = req.body;

            const createdTendik = await AuthService.registerTendik(users);
            return res.status(201).json(createdTendik);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async login(req: Request<{}, {}, LoginDTO>, res: Response) {
        try {
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
            return res.status(201).json(result.user);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async refreshToken(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken;
        console.log(refreshToken);

        if (!refreshToken) {
            return res.status(402).json({ message: "Refresh token is required" });
        }

        try {
            const result = await AuthService.refreshToken(refreshToken!);

            res.cookie("token", result.newToken, {
                httpOnly: true,
                secure: true,
                maxAge: 15 * 60 * 1000,
                sameSite: "none"
            });

            res.json({
                message: Messages.LOGIN_SUCCESS,
                user: { id: result.user.id, username: result.user.username }
            });
            return res.status(200).json(result.user);
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async logout(req: Request, res: Response) {
        const refreshToken = req.headers["refreshtoken"] || req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(402).json({ message: "Refresh token is required" });
        }

        try {
            await AuthService.logout(refreshToken!);

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
            return res.status(200).json({ message: Messages.LOGOUT_SUCCESS });
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async me(req: Request, res: Response) {
        const userId = req.user?.id

        if (!userId) {
            return res.status(402).json({ message: Messages.NIP_REQUIRED });
        }

        try {
            const result = await AuthService.me(userId);
            console.log('bisa')
            return res.status(200).json({ id: result.user.id, username: result.user.username, role: result.user.role })
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }
}