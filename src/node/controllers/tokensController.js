
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const usersModel = require("../models/usersModel");

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing username or password" });
  }
  const user = usersModel.findUser(username, password);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
  return res.status(200).json({ token });
};
