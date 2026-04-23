const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Unauthorized - Invalid token" });
  }
};

module.exports = authMiddleware;