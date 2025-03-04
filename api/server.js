import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import usersRoutes from './routes/usersRoutes.js';
import transactionsRoutes from './routes/transactionsRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/users', usersRoutes);
app.use('/transactions', transactionsRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
