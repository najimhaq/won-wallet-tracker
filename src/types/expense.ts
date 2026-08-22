export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum Category {
  FOOD = 'FOOD',
  TRANSPORT = 'TRANSPORT',
  SHOPPING = 'SHOPPING',
  BILLS = 'BILLS',
  SALARY = 'SALARY',
  OTHER = 'OTHER',
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  category: Category;
  description?: string;
  date: Date;
  createdAt: Date;
}

export type CreateTransactionInput = Omit<Transaction, 'id' | 'createdAt'>;
