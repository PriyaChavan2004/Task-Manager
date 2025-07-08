const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];//header methode =Also an Express method.Used to read a header from the incoming HTTP request.
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify== provided by the jsonwebtoken NPM package
    req.user = decoded.id; // This line is okay only if you used { id: ... } when signing
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' }); // Built-in function in Express (not a JavaScript keyword).Used to set the HTTP status code in the response.
  }
}

module.exports = auth;
