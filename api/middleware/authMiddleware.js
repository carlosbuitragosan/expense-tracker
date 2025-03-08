import jwt from 'jsonwebtoken';
import query from '../utils/db.js';

export const authenticateJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error('Error verifying token: ', err);
    return res.status(403).json({ message: 'Invalide or expired token.' });
  }
};
