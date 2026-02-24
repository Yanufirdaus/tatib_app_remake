import express from 'express';
import { AdminMiddleware, AuthMidleware} from '../midlewares/AuthMidleware';
import { PelanggaranController } from '../controllers/PelanggaranController';
import { validatePelanggaranInputMiddleware } from '../midlewares/PelanggaranMidleware';

const pelanggaranRouter = express.Router();

pelanggaranRouter.post('/pelanggaran', AuthMidleware, AdminMiddleware, validatePelanggaranInputMiddleware, PelanggaranController.addPelanggaran);
pelanggaranRouter.get('/pelanggaran/jenis/:jenisId', AuthMidleware, AdminMiddleware, PelanggaranController.getPelanggaranByJenis);
pelanggaranRouter.put('/pelanggaran/:id', AuthMidleware, AdminMiddleware, PelanggaranController.updatePelanggaran);
pelanggaranRouter.delete('/pelanggaran/:id', AuthMidleware, AdminMiddleware, PelanggaranController.deletePelanggaran);

export default pelanggaranRouter;