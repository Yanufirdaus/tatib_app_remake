import express from 'express';
import { AdminMiddleware, AuthMidleware } from '../middleware/AuthMiddleware';
import { SemesterController } from '../controllers/SemesterController';
import { UpdateSemesterMidleware } from '../middleware/SemesterMiddleware';

const semesterRouter = express.Router();

semesterRouter.get("/current", AuthMidleware, SemesterController.getCurrentSemester);

semesterRouter.put("/current", AuthMidleware, AdminMiddleware, UpdateSemesterMidleware, SemesterController.updateCurrentSemester);

export default semesterRouter;