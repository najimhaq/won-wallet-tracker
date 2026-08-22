import { Router } from 'express';
import { createExpense } from '../controllers/expense.controller.js';

const expenseRouter = Router();

expenseRouter.post('/expenses', createExpense);

export default expenseRouter;
