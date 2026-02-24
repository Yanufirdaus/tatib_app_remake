import express from 'express'
import cors from 'cors'
import authRouter from '../routes/Auth'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import kelasRouter from '../routes/Kelas';
import userRouter from '../routes/User';
import pelanggaranRouter from '../routes/Pelanggaran';

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(cors())

app.use(authRouter);
app.use(kelasRouter);
app.use(userRouter);
app.use(pelanggaranRouter)

app.listen(3001, () => {
  console.log('server running on port 3001')
})