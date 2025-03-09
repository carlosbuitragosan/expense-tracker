import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import usersRoutes from './routes/usersRoutes.js';
import expensesRoutes from './routes/expensesRoutes.js';

dotenv.config();

export const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/users', usersRoutes);
app.use('/expenses', expensesRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
