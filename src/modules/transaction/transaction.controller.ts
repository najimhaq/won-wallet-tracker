import type { Request, Response, NextFunction } from 'express';

import { prisma } from '../../lib/db.js';
import { createTransactionSchema } from './transaction.validation.js';

export async function createTransaction(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validatedData = createTransactionSchema.parse(req.body);

    const transaction = await prisma.transaction.create({
      data: {
        ...validatedData,
        userId: req.user!.id,
        description: validatedData.description ?? null,
      },
    });

    return res.status(201).json({
      message: 'Transaction created successfully.',
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMyTransactions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.user!.id,
      },
      orderBy: {
        date: 'desc',
      },
    });

    return res.status(200).json({
      message: 'Transactions fetched successfully.',
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
}
