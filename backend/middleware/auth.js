const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // This line is okay only if you used { id: ... } when signing
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
}

module.exports = auth;
