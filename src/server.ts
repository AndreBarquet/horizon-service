const express = require('express');
const cors = require('cors');

import { Router, Request, Response } from 'express';

// Routes
import usersRoutes from '@/routes/usersRoutes';
import authRouter from '@/routes/authRoutes';

// Middlewares
import { validateToken } from '@/api/middlewares/authMiddleware';

// Server port
const PORT: string = process.env.PORT || '4000';

// App Express
const app = express();
const route = Router();

// Cors
app.use(cors({ origin: [`http://localhost:${PORT}`] }));

app.use(express.json());

// middleware
app.use("/api/*", validateToken);

// Routes
app.use(route);
app.use("/auth", authRouter);
app.use("/api", usersRoutes);

app.use((err: any, req: Request, res: Response) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(PORT, () => `server running on port ${PORT}`);