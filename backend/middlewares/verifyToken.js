const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let token = req?.cookies?.token;
  //   console.log("Token received:", token);

  if (!token) {
    return res.status(401).json({ error: "Please login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = verifyToken;
