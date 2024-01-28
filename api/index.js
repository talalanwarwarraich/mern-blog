import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

const API_PREFIX = '/api';

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log('MongoDB is connected'))
  .catch((error) => console.log(error));

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use(`${API_PREFIX}/user`, userRouter);
app.use(`${API_PREFIX}/auth`, authRouter);
