import express from 'express';
import { AdminMiddleware, AuthMidleware } from '../midlewares/AuthMidleware';
import { SemesterController } from '../controllers/SemesterController';
import { UpdateSemesterMidleware } from '../midlewares/SemesterMidleware';

const semesterRouter = express.Router();

semesterRouter.get("/current", AuthMidleware, SemesterController.getCurrentSemester);

semesterRouter.put("/current", AuthMidleware, AdminMiddleware, UpdateSemesterMidleware, SemesterController.updateCurrentSemester);

export default semesterRouter;