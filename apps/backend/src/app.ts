import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './api/routes/taskRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default app;
