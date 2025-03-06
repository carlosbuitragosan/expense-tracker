import jwt from 'jsonwebtoken';

export const authenticateJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    //set session variable in postgres
    await query(`SET myapp.user_id = ${decoded.userId}`, []);

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalide or expired token.' });
  }
};
