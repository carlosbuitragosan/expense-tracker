import pkg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '../models/users.js';

const { Client } = pkg;

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: 'Email and password are required.' });
  }
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists.' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, passwordHash);
    res.status(201).json(newUser);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error creating user.', error: err });
  }
};

export const getUser = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await getUserByEmail(email);
    if (user) {
      res.status(200).json(user);
    }
    res.status(404).json({ message: 'User not found' });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user.' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: 'Email and password are required.' });
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .json({ error: 'Invalid email or password.' });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );
    if (!passwordMatch) {
      return res
        .status(404)
        .json({ error: 'Invalid email or password.' });
    }

    // create a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPRIRATION }
    );

    // set the session variable for user_id
    const client = await new Client();
    await client.connect();
    // set the session to be used for RLS
    await client.query(`SET myapp.user_id = $1`, [user.id]);

    res.status(200).json({ message: 'Login successful.', token });

    await client.end();
  } catch (err) {
    console.error('Error logging in user: ', err);
    res
      .status(500)
      .json({ message: 'Error logging in user', error: err });
  }
};
