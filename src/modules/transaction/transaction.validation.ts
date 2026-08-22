import { z } from 'zod';

export const transactionTypeValues = ['INCOME', 'EXPENSE'] as const;

export const transactionCategoryValues = [
  'FOOD',
  'TRANSPORT',
  'SHOPPING',
  'BILLS',
  'SALARY',
  'OTHER',
] as const;

export const createTransactionSchema = z.object({
  amount: z
    .number()
    .positive('Amount must be greater than 0.')
    .finite('Amount must be a valid number.'),

  type: z.enum(transactionTypeValues),

  category: z.enum(transactionCategoryValues),

  description: z
    .string()
    .trim()
    .max(250, 'Description cannot be more than 250 characters.')
    .optional(),

  date: z.coerce.date(),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
