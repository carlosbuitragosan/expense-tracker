import pkg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import query from '../utils/db.js';
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
  // verify input
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: 'Email and password are required.' });
  }
  try {
    // check if user exists
    const user = await query(
      `SELECT * FROM users
      WHERE email = $1`,
      [email]
    );
    if (!user.rows.length) {
      return res
        .status(401)
        .json({ error: 'Invalid email or password.' });
    }
    const userData = user.rows[0];

    // check if password matches
    const passwordMatch = await bcrypt.compare(
      password,
      userData.password_hash
    );
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: 'Invalid email or password.' });
    }

    // create a JWT token
    const token = jwt.sign(
      { userId: userData.id, email: userData.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPRIRATION }
    );

    // return the token
    res.status(200).json({ message: 'Login successful.', token });
  } catch (err) {
    console.error('Error logging in user: ', err);
    res
      .status(500)
      .json({ message: 'Error logging in user', error: err });
  }
};
