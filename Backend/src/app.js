// app.js - Main express app setup
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use('/api', routes);

app.use((req, res, next) => {
  console.log('Incoming request from origin:', req.headers.origin);
  next();
});


app.get('/api/ping', (req, res) => {
  res.json({ msg: 'pong' });
});


app.use(errorHandler);

export default app;
