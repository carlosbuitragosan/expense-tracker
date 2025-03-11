import session from 'express-session';
import pgSession from 'connect-pg-simple';
import { pool } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const pgSessionStore = pgSession(session);

const sessionConfig = {
  store: new pgSessionStore({
    pool,
    tableName: 'session',
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  database: DB_NAME,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,
  },
};

export default sessionConfig;
