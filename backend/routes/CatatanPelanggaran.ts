import express from 'express';
import { AuthMidleware, TendikAdminMiddleware } from '../midlewares/AuthMidleware';
import { CatatanPelanggaranController } from '../controllers/CatatanPelanggaranController';
import { validateCatatanPelanggaranInputMiddleware, validateManyCatatanPelanggaranInputMiddleware } from '../midlewares/CatatanPelanggaranMidleware';

const catatanPelanggaranRouter = express.Router();

catatanPelanggaranRouter.post('/catatan-pelanggaran', AuthMidleware, TendikAdminMiddleware, validateCatatanPelanggaranInputMiddleware, CatatanPelanggaranController.addCatatanPelanggaran);

catatanPelanggaranRouter.post('/catatan-pelanggaran/batch', AuthMidleware, TendikAdminMiddleware, validateManyCatatanPelanggaranInputMiddleware, CatatanPelanggaranController.addManyCatatanPelanggaran);

catatanPelanggaranRouter.get('/catatan-pelanggaran/pelanggar/:idPelanggar', AuthMidleware, TendikAdminMiddleware, CatatanPelanggaranController.getCatatanPelanggaranByPelanggar);

catatanPelanggaranRouter.get('/catatan-pelanggaran/pelanggar/:idPelanggar/rekap', AuthMidleware, TendikAdminMiddleware, CatatanPelanggaranController.getCatatanPelanggaranRekap);

catatanPelanggaranRouter.delete('/catatan-pelanggaran/:id', AuthMidleware, TendikAdminMiddleware, CatatanPelanggaranController.deleteCatatanPelanggaran);

export default catatanPelanggaranRouter;