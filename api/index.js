import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

const API_PREFIX = '/api';

dotenv.config();

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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
