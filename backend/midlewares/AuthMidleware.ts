import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { Messages } from "../constant/message";

export const AuthMidleware = (req: Request, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers.authorization;

    console.log("Auth Header:", authHeader); // Debug log for auth header

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded: any = verifyAccessToken(token);
        req.body.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

export const AdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
};


export const TendikAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user.role !== "kesiswaan" && req.body.user.role !== "admin" && req.body.user.role !== "kepsek" && req.body.user.role !== "bk") {
        return res.status(403).json({ message: "Forbidden: Tendik only and Admin Only" });
    }
    next();
}


export const validateLoginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nomor_induk, password } = req.body;

  if (!nomor_induk || nomor_induk.trim() === "") {
    return res.status(400).json({ message: Messages.NISN_REQUIRED });
  }

  if (!password || password.trim() === "") {
    return res.status(400).json({ message: Messages.PASSWORD_REQUIRED });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: Messages.PASSWORD_TOO_SHORT });
  }
  

  next();
};


export const validateRegisterTendikMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: CreateTendikDTO = req.body[0];

    if (!input.name || input.name.trim() === "") {
        return res.status(400).json({ message: Messages.NAME_REQUIRED });
    }
    if (!input.nip || input.nip.trim() === "") {
        return res.status(400).json({ message: Messages.NIP_REQUIRED });
    }
    if (!input.password || input.password.trim() === "") {
        return res.status(400).json({ message: Messages.PASSWORD_REQUIRED });
    }
    if (input.password.length < 6) {
        return res.status(400).json({ message: Messages.PASSWORD_TOO_SHORT });
    }
    next();
};

export const validateRegisterSiswaMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: CreateSiswaDTO  = req.body[0]; // Assuming req.body is an array of students

    console.log("Input data:", req.body[0]); // Debug log for input validation
    
    if (!input.name || input.name.trim() === "") {
        return res.status(400).json({ message: Messages.NAME_REQUIRED });
    }
    if (!input.nisn || input.nisn.trim() === "") {
        return res.status(400).json({ message: Messages.NISN_REQUIRED });
    }
    if (!input.kelasId) {
        return res.status(400).json({ message: Messages.KELASID_REQUIRED });
    }
    if (!input.password || input.password.trim() === "") {
        return res.status(400).json({ message: Messages.PASSWORD_REQUIRED });
    }
    if (input.password.length < 6) {
        return res.status(400).json({ message: Messages.PASSWORD_TOO_SHORT });
    }
    next();
};