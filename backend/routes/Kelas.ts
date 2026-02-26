import express from 'express';
import { AdminMiddleware, AuthMidleware } from '../midlewares/AuthMidleware';
import { KelasController } from '../controllers/KelasController';
import { CreateManyKelasMidleware } from '../midlewares/KelasMidleware';
import { CreateKelasMidleware } from '../midlewares/KelasMidleware';

const kelasRouter = express.Router();

kelasRouter.get("/kelas", AuthMidleware, AdminMiddleware, KelasController.getAllKelas);

kelasRouter.post("/kelas", AuthMidleware, AdminMiddleware, CreateKelasMidleware, KelasController.createKelas);

kelasRouter.post("/kelas/batch", AuthMidleware, AdminMiddleware, CreateManyKelasMidleware, KelasController.createManyKelas);

kelasRouter.delete("/kelas/:id", AuthMidleware, AdminMiddleware, KelasController.deleteKelas);

export default kelasRouter;