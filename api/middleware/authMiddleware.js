import jwt from 'jsonwebtoken';

export const authenticateJWT = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, email: decoded.email };
    next();
  } catch (err) {
    console.error('Error verifying token: ', err);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};
