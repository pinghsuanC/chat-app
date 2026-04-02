import { Router } from 'express';

// Private routes require a valid JWT.
// Apply auth middleware in the parent router before mounting this.
const router = Router();

export default router;
