import { Router } from 'express';
import healthRouter from './health';

const router = Router();

router.use('/health', healthRouter);
// router.use('/users', usersRouter);
// router.use('/messages', messagesRouter);

export default router;
