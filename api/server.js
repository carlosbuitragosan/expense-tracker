import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import usersRoutes from './routes/usersRoutes.js';
import expensesRoutes from './routes/expensesRoutes.js';
import categoriesRouter from './routes/categoriesRoutes.js';

dotenv.config();

const allowedOrigins = [
  'http://localhost:5173',
  'https://expensetracker.uk',
  'https://www.expensetracker.uk',
];
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(morgan('dev'));

app.use('/users', usersRoutes);
app.use('/expenses', expensesRoutes);
app.use('/categories', categoriesRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
