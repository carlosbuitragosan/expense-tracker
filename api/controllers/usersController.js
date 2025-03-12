import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '../models/usersModel.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Invalid credentials.' });
  }
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await createUser(email, passwordHash);

    const token = jwt.sign(
      { UserId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    //Store the token in a http-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 48,
    });

    res.status(201).json({ message: 'User registered succesfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.', error: err });
  }
};

export const getUser = async (req, res) => {
  const { email } = req.user;
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
    return res.status(400).json({ error: 'Invalid credentials.' });
  }
  try {
    // check if user exists
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // check if password matches
    const passwordMatch = await bcrypt.compare(
      password,
      existingUser.password_hash
    );
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    // create a JWT token including the user id and email
    const token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    //Store the token in a http-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 48,
    });

    return res.status(200).json({ message: 'Login successful.' });
  } catch (err) {
    console.error('Error logging in user: ', err);
    res.status(500).json({ message: 'Error logging in user', error: err });
  }
};
