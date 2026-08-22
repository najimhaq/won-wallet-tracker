import type { Request, Response } from 'express';
import { prisma } from '../lib/db.js';
import { auth } from '../lib/auth.js';
import { createExpenseSchema } from '../schemas/expenseSchema.js';

// ১. একটি এক্সপোর্টেড ফাংশন তৈরি করা (এটাই আমাদের Controller)
export const createExpense = async (req: Request, res: Response) => {
  try {
    // ধাপ ১: অথেনটিকেশন চেক
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return res
        .status(401)
        .json({ error: 'Unauthorized! Please login first.' });
    }

    // ধাপ ২: Zod ভ্যালিডেশন
    const validationResult = createExpenseSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid data',
        details: validationResult.error.issues,
      });
    }

    const validatedData = validationResult.data;

    // ধাপ ৩: ডেটাবেসে সেভ করা (Model এর সাথে ইন্টারঅ্যাকশন)
    const newExpense = await prisma.transaction.create({
      data: {
        userId: session.user.id,
        amount: validatedData.amount,
        type: validatedData.type,
        category: validatedData.category,
        description: validatedData.description ?? null,
        date: new Date(validatedData.date),
      },
    });

    // ধাপ ৪: রেসপন্স পাঠানো (View এর কাজ)
    return res.status(201).json({
      message: 'Expense added successfully!',
      expense: newExpense,
    });
  } catch (error) {
    console.error('Expense creation error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
