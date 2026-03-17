import express from 'express'
import cors from 'cors'
import authRouter from '../routes/Auth'
import cookieParser from 'cookie-parser';
import kelasRouter from '../routes/Kelas';
import userRouter from '../routes/User';
import pelanggaranRouter from '../routes/Pelanggaran';
import catatanPelanggaranRouter from '../routes/CatatanPelanggaran';
import semesterRouter from '../routes/Semester';
import { v2 as cloudinary } from 'cloudinary';
import { globalErrorHandler } from '../middleware/errorMiddleware';
import { appConfig } from '../config/app.config';

cloudinary.config({
  cloud_name: appConfig.cloudinary.cloudName,
  api_key: appConfig.cloudinary.apiKey,
  api_secret: appConfig.cloudinary.apiSecret
});

const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || appConfig.allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}))

app.use(authRouter);
app.use(kelasRouter);
app.use(userRouter);
app.use(pelanggaranRouter)
app.use(catatanPelanggaranRouter);
app.use(semesterRouter);

app.use(globalErrorHandler);

app.listen(appConfig.port, appConfig.host, () => {
  console.log(`server running on ${appConfig.host}:${appConfig.port}`)
})