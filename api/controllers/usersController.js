import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '../models/users.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
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
    res.status(500).json({ message: 'Error creating user.', error: err });
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
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  try {
    // check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // check if password matches
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    // create a JWT token including the user id and email
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    // return the token
    return res.status(200).json({
      message: 'Login successful.',
      user: { email: user.email, id: user.id, token },
    });
  } catch (err) {
    console.error('Error logging in user: ', err);
    res.status(500).json({ message: 'Error logging in user', error: err });
  }
};
