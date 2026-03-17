import express from 'express';
import { AdminMiddleware, AuthMidleware } from '../middleware/AuthMiddleware';
import { PelanggaranController } from '../controllers/PelanggaranController';
import { validatePelanggaranInputMiddleware, validateUpdatePelanggaranMiddleware } from '../middleware/PelanggaranMiddleware';

const pelanggaranRouter = express.Router();

pelanggaranRouter.post('/pelanggaran', AuthMidleware, AdminMiddleware, validatePelanggaranInputMiddleware, PelanggaranController.addPelanggaran);

pelanggaranRouter.get('/pelanggaran/jenis/:jenisId', AuthMidleware, PelanggaranController.getPelanggaranByJenis);

pelanggaranRouter.get('/pelanggaran/jenis', AuthMidleware, PelanggaranController.getAllJenisPelanggaran);

pelanggaranRouter.put('/pelanggaran/:id', AuthMidleware, AdminMiddleware, validateUpdatePelanggaranMiddleware, PelanggaranController.updatePelanggaran);

pelanggaranRouter.delete('/pelanggaran/:id', AuthMidleware, AdminMiddleware, PelanggaranController.deletePelanggaran);

export default pelanggaranRouter;