const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.status(401).json({ error: `Invalid token!` });  
  
  try {
    const auth = jwt.verify(token, process.env.SECRET);
    req.user = auth;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token!" });
  }
};
module.exports = verifyJwt;