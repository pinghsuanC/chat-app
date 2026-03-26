import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { connectDb } from './config/db';
import { connectRedis } from './config/redis';
import router from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

app.use('/api', router);
app.use(errorHandler);

async function start() {
  connectDb().catch((err) => console.warn('PostgreSQL unavailable:', err.message));
  connectRedis().catch((err) => console.warn('Redis unavailable:', err.message));

  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
}

start();
