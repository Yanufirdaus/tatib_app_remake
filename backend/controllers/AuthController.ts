import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { Messages } from '../constant/message';
import { LoginService } from '../services/LoginService';

export class AuthController {
    static async registerStudents(req: Request<{}, {}, CreateSiswaDTO[]>, res: Response) {
        try {
            const users = req.body;

            const createdStudents = await AuthService.registerStudents(users);
            return res.status(201).json(createdStudents);
        } catch (err:any) {
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
        } catch (err:any) {
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
                secure: process.env.NODE_ENV === "production",
                maxAge: 15 * 60 * 1000,
                sameSite: "strict"
            });

            res.cookie("refreshToken", refreshTokenValue, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: "strict"
            });

            res.json({
                message: Messages.LOGIN_SUCCESS,
                user: { id: user.id, username: user.name }
            });
            return res.status(201).json(result.user);
        } catch (err:any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }

    static async refreshToken(req: Request, res: Response) {
        const refreshToken = req.headers.authorization;
        // console.log("Received refresh token:", refreshToken);

        if (!refreshToken || !refreshToken.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Refresh token is required" });
        }

        try {
            const result = await AuthService.refreshToken(refreshToken!);
            
            res.cookie("token", result.newToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 15 * 60 * 1000,
                sameSite: "strict"
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: "strict"
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
            return res.status(401).json({ message: "Refresh token is required" });
        }

        try {
            await AuthService.logout(refreshToken!);

            res.clearCookie("token");
            res.clearCookie("refreshToken");
            return res.status(200).json({ message: Messages.LOGOUT_SUCCESS });
        } catch (err: any) {
            console.error(err.message);
            res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || Messages.SERVER_ERROR,
            });
        }
    }
}