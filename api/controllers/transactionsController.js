import {
  insertTransaction,
  getTransactionsByUserId,
} from '../models/transactions.js';

export const addTransaction = async (req, res) => {
  const { userId, amount, type, categoryId, date } = req.body;
  try {
    const transaction = await insertTransaction(
      userId,
      amount,
      type,
      categoryId,
      date
    );
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: 'Error creating transaction.' });
  }
};

export const getTransactions = async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await getTransactionsByUserId(userId);
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions.' });
  }
};
