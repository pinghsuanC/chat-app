import { Router, Request, Response } from 'express';
import { db } from '../../config/db';
import { redis } from '../../config/redis';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const status = {
    server: 'ok',
    db: 'unknown',
    redis: 'unknown',
  };

  try {
    await db.query('SELECT 1');
    status.db = 'ok';
  } catch {
    status.db = 'error';
  }

  try {
    await redis.ping();
    status.redis = 'ok';
  } catch {
    status.redis = 'error';
  }

  const allOk = Object.values(status).every((v) => v === 'ok');
  res.status(allOk ? 200 : 503).json(status);
});

export default router;
