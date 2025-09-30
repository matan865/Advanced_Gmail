const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const User = require("../models/usersModel"); 

exports.login = async (req, res) => {
  try {
    const { email, username, identifier, password } = req.body;
    const key = (email || username || identifier || "").toLowerCase().trim();
    if (!key || !password) {
      return res.status(400).json({ error: "Missing email/username or password" });
    }

    const user = await User.findOne({
      $or: [{ email: key }, { username: key }],
    }).lean();

    if (!user || user.password !== password) {      
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const userId = String(user._id);
    const token = jwt.sign({ sub: userId, email: user.email }, SECRET, { expiresIn: "12h" });
    return res.status(200).json({ token, userId });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Login failed" });
  }
};
