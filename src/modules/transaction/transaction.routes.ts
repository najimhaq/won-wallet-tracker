import { Router } from 'express';

import {
  createTransaction,
  getMyTransactions,
} from './transaction.controller.js';
import { requireAuth } from '../../middlewares/require-auth.js';

const transactionRouter = Router();

transactionRouter.use(requireAuth);

transactionRouter.route('/').post(createTransaction).get(getMyTransactions);

export default transactionRouter;
