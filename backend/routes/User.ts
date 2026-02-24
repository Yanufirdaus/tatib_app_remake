import express from 'express';
import { UserController } from '../controllers/UserController';
import { AdminMiddleware, AuthMidleware, TendikAdminMiddleware } from '../midlewares/AuthMidleware';
import { UpdateSiswaInputCheckingMiddleware, UpdateTendikInputCheckingMiddleware } from '../midlewares/UserMidleware';

const userRouter = express.Router();

userRouter.get("/students/:id", AuthMidleware, UserController.getSiswaById);
userRouter.get("/tendik/:id", AuthMidleware, UserController.getTendikById);
userRouter.get("/tendik/role/:role", AuthMidleware, AdminMiddleware, UserController.getTendikByRole);
userRouter.get("/kelas/:kelasId/students", AuthMidleware, TendikAdminMiddleware, UserController.getSiswaByKelas);
userRouter.put("/students/:id", AuthMidleware, AdminMiddleware, UpdateSiswaInputCheckingMiddleware, UserController.updateSiswa);
userRouter.put("/tendik/:id", AuthMidleware, AdminMiddleware, UpdateTendikInputCheckingMiddleware, UserController.updateTendik);

export default userRouter;