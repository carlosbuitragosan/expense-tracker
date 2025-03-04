import express from 'express';
import {
  addTransaction,
  getTransactions,
} from '../controllers/transactionsController.js';

const router = express.Router();

router.post('/', addTransaction);
router.get('/:userId', getTransactions);

export default router;
