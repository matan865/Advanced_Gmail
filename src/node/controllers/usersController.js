const usersModel = require('../models/usersModel');

exports.registerUser = (req, res) => {
  const { username, password, name, email, avatarUrl } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const newUser = usersModel.addUser({ username, password, name, email, avatarUrl });

  if (!newUser) {
    return res.status(409).json({ error: 'User already exists' });
  }
   res.status(201).location(`/api/users/${newUser.id}`).send();
};

exports.getUser = (req, res) => {
  const user = usersModel.getUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
   res.status(200).json(user);
};
