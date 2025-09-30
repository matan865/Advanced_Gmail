
const User = require('../models/usersModel');

async function generateUniqueUsername(base) {
  const clean = String(base || '').trim().toLowerCase();
  if (!clean) return null;
  let candidate = clean, i = 1;
  while (await User.exists({ username: candidate })) {
    candidate =  clean + i++;
  }
  return candidate;
}

exports.registerUser = async (req, res) => {
  try {
    let { username, password, name, avatarUrl } = req.body; 
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const uniqueUsername = await generateUniqueUsername(username);
    if (!uniqueUsername) {
      return res.status(400).json({ error: 'Invalid username' });
    }

    const emailNorm   = uniqueUsername + "@mail.com";
    const finalName   = name || uniqueUsername;
    const finalAvatar = avatarUrl || '/avatars/avatar1.png';

    const u = await User.create({
      username: uniqueUsername,
      password,         
      name: finalName,
      email: emailNorm,
      avatarUrl: finalAvatar
    });

    const obj = u.toObject();
    return res.status(201).json({
      id: String(obj._id),
      username: obj.username,
      name: obj.name,
      email: obj.email,
      avatarUrl: obj.avatarUrl,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt
    });
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ error: 'User already exists' });
    console.error(e);
    return res.status(400).json({ error: 'Signup failed' });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password -__v').lean();
  res.status(200).json(users.map(u => ({
    id: String(u._id),
    username: u.username,
    name: u.name,
    email: u.email,
    avatarUrl: u.avatarUrl,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt
  })));
};

exports.getUser = async (req, res) => {
  const u = await User.findById(req.params.id).select('-password -__v').lean();
  if (!u) return res.status(404).json({ error: 'User not found' });
  res.status(200).json({
    id: String(u._id),
    username: u.username,
    name: u.name,
    email: u.email,
    avatarUrl: u.avatarUrl,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt
  });
};