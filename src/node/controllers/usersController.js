require('dotenv').config();
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const SECRET = process.env.JWT_SECRET;

exports.registerUser = (req, res) => {
  const { username, password, name, email, avatarUrl } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const newUser = usersModel.addUser({ username, password, name, email, avatarUrl });

  if (!newUser) {
    return res.status(409).json({ error: 'User already exists' });
  }
  const token = jwt.sign( { userId: newUser.id }, SECRET, { expiresIn: '1h' });
  return res.status(201).json({ token });
};

exports.getUser = (req, res) => {
  const user = usersModel.getUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
   res.status(200).json(user);
};

exports.getAllUsers = (req, res) => {
  const users = usersModel.getAllUsers();
  res.status(200).json(users);
};
