const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

module.exports = function authMiddleware(req, res, next) {
  const auth = req.header("Authorization") || "";
  const [scheme, token] = auth.split(" ");
  //const userIdHeader = req.header("user-id");

  if (scheme !== "Bearer" || !token)
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  //if (!userIdHeader)
    //return res.status(400).json({ error: "Missing user-id header" });

  try {
    const payload = jwt.verify(token, SECRET);
    //const tokenUserId = String(payload.sub || payload.userId); 
    //if (String(userIdHeader) !== tokenUserId)
      //return res.status(401).json({ error: "user-id mismatch" });

    //req.userId = tokenUserId;
    req.userId = String(payload.sub || payload.userId || payload.id);
    const hdr = req.headers['user-id'];
    if (hdr && String(hdr) !== req.userId) {
      return res.status(401).json({ error: 'user-id mismatch' });
    }
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
