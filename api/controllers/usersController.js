import { createUser, getUserByEmail } from '../models/users.js';

export const registerUser = async (req, res) => {
  const { email, passwordHash } = req.body;
  try {
    const user = await createUser(email, passwordHash);
    res.status(201).json(user);
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
