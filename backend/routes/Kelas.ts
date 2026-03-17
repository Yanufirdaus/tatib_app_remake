import express from 'express';
import { AdminMiddleware, AuthMidleware } from '../middleware/AuthMiddleware';
import { KelasController } from '../controllers/KelasController';
import { CreateManyKelasMidleware } from '../middleware/KelasMiddleware';
import { CreateKelasMidleware } from '../middleware/KelasMiddleware';

const kelasRouter = express.Router();

kelasRouter.get("/kelas", AuthMidleware, KelasController.getAllKelas);

kelasRouter.get("/kelas/:id", AuthMidleware, KelasController.getKelasById);

kelasRouter.post("/kelas", AuthMidleware, AdminMiddleware, CreateKelasMidleware, KelasController.createKelas);

kelasRouter.post("/kelas/batch", AuthMidleware, AdminMiddleware, CreateManyKelasMidleware, KelasController.createManyKelasNew);

kelasRouter.delete("/kelas/:id", AuthMidleware, AdminMiddleware, KelasController.deleteKelas);

export default kelasRouter;