import express from 'express';
import { AdminMiddleware, AuthMidleware } from '../midlewares/AuthMidleware';
import { KelasController } from '../controllers/KelasController';

const kelasRouter = express.Router();

kelasRouter.get("/kelas", AuthMidleware, AdminMiddleware, KelasController.getAllKelas);
kelasRouter.post("/kelas", AuthMidleware, AdminMiddleware, KelasController.createKelas);
kelasRouter.post("/kelas/batch", AuthMidleware, AdminMiddleware, KelasController.createManyKelas);
kelasRouter.delete("/kelas/:id", AuthMidleware, AdminMiddleware, KelasController.deleteKelas);

export default kelasRouter;