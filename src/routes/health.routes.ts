import { Router } from 'express';

import { env } from '../config/env.js';

import { requireAuth } from '../middlewares/require-auth.js';
import { prisma } from '../lib/db.js';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res) => {
  await prisma.$queryRaw`SELECT 1`;

  res.status(200).json({
    success: true,
    message: 'WonWallet API and database are running',
    environment: env.NODE_ENV,
  });

  healthRouter.get('/me', requireAuth, (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  });
});
