import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// test connection on startup
const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('DB connected at: ', res.rows[0]);
  } catch (err) {
    console.log('DB connection error: ', err);
  }
};

testConnection();

//function to execute queries on the db
const query = async (text, params, userId = null) => {
  const client = await pool.connect();
  try {
    if (userId) {
      await client.query(`SET myapp.user_id = $1`, [userId]);
    }
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
};

export default query;
