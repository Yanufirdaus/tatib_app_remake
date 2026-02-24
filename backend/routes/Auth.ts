import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { AdminMiddleware, AuthMidleware, validateLoginMiddleware, validateRegisterSiswaMiddleware, validateRegisterTendikMiddleware } from '../midlewares/AuthMidleware';

const authRouter = express.Router();

authRouter.post("/register/students", AuthMidleware, AdminMiddleware, validateRegisterSiswaMiddleware, AuthController.registerStudents);

authRouter.post("/register/tendik", AuthMidleware, AdminMiddleware, validateRegisterTendikMiddleware, AuthController.registerTendik);

authRouter.post("/login", validateLoginMiddleware, AuthController.login);

authRouter.post("/refresh-token", AuthController.refreshToken);

authRouter.post("/logout", AuthMidleware, AuthController.logout);

export default authRouter;