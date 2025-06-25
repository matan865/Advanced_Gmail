const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

module.exports = function authMiddleware(req, res, next) {
  const auth = req.header("Authorization") || "";
  const [scheme, token] = auth.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }
  try {
    const payload = jwt.verify(token, SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
