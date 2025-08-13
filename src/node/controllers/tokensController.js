
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const usersModel = require("../models/usersModel");

exports.login = (req, res) => {
  const { username, identifier, email, password } = req.body;
  const usernameOrEmail = username || identifier || email;
  if (!usernameOrEmail || !password) {
    return res.status(400).json({ error: "Missing username or password" });
  }
  const user = usersModel.findUser(usernameOrEmail, password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
  return res.status(200).json({ token, userId: user.id });
};
