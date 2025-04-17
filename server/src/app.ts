import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import scoreRoutes from './routes/scores';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/scores', scoreRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

export default app;
