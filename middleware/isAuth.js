const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = require("../util/jwtSecretKey.s");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRET_KEY);
  } catch {
    const error = new Error("JWT Decode error.");
    error.statusCode = 500;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
