import express from 'express';
import { AdminMiddleware, AuthMidleware } from '../midlewares/AuthMidleware';
import { SemesterController } from '../controllers/SemesterController';

const semesterRouter = express.Router();

semesterRouter.get("/current", AuthMidleware, SemesterController.getCurrentSemester);

semesterRouter.put("/current", AuthMidleware, AdminMiddleware, SemesterController.updateCurrentSemester);

export default semesterRouter;