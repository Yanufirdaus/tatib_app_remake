import express from 'express'
import cors from 'cors'
import authRouter from '../routes/Auth'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import kelasRouter from '../routes/Kelas';
import userRouter from '../routes/User';
import pelanggaranRouter from '../routes/Pelanggaran';
import catatanPelanggaranRouter from '../routes/CatatanPelanggaran';
import semesterRouter from '../routes/Semester';

// const envFile = process.env.NODE_ENV === "production" ? ".env.prod" : ".env";
dotenv.config();

const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  "https://g54gvt4v-5173.asse.devtunnels.ms"
];

app.use(express.json())
app.use(cookieParser());
app.use(cors(
  {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials:true
  }
))

app.use(authRouter);
app.use(kelasRouter);
app.use(userRouter);
app.use(pelanggaranRouter)
app.use(catatanPelanggaranRouter);
app.use(semesterRouter);

app.listen(3001, "0.0.0.0", () => {
  console.log('server running on port 3001')
})