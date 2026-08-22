import { z } from 'zod';
import { TransactionType, Category } from '../types/expense.js';


export const createExpenseSchema = z.object({
  amount: z.number().positive('Amount must be greater than 0'),
  type: z.nativeEnum(TransactionType),
  category: z.nativeEnum(Category),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters')
    .optional(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
});


export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
