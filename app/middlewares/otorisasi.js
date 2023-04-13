const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
const authHeader = req.headers.authorization;
const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({message:"Forbidden"});
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        mesagge:"Unauthorized"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;