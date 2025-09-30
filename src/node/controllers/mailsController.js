
const net = require('net');
const { isValidObjectId } = require('mongoose');
const User = require('../models/usersModel');
const Mail = require('../models/mailsModel');

const HOST = 'server'; 
const PORT = 5555;

function extractUrls(text) {
  return (String(text || '').match(/(?:https?:\/\/)?(?:www\.)?[^\s]+/gi)) || [];
}

function isUrlSafe(url) {
  if (!/^https?:\/\//i.test(url)) return Promise.resolve(true);
  return new Promise((resolve, reject) => {
    const client = net.createConnection({ host: HOST, port: PORT }, () => {
      client.write(`GET ${url}\n`);
    });
    client.once('data', data => {
      const safe = !data.toString().includes('true true');
      client.end();
      resolve(safe);
    });
    client.once('error', err => {
      client.destroy();
      reject(err);
    });
  });
}

function toPublicUser(u) {
  if (!u) return null;
  const { _id, username, email, avatarUrl, name } = u;
  return { id: String(_id), username, email, avatarUrl, name };
}

function shapeMail(m, usersById) {
  const fromObj =
    usersById[String(m.from)] ? toPublicUser(usersById[String(m.from)]) : m.from;

  const toObjs = (m.to || []).map(t =>
    usersById[String(t)] ? toPublicUser(usersById[String(t)]) : t
  );
  const toField = toObjs.length === 1 ? toObjs[0] : toObjs;

  const shaped = {
    ...m,
    id: String(m._id),
    from: fromObj,
    to: toField
  };

  if (!shaped.date && shaped.createdAt) shaped.date = shaped.createdAt;
  delete shaped.__v;

  return shaped;
}

async function enrichUsers(mails) {
  if (!mails?.length) return [];

  const idSet = new Set();
  for (const m of mails) {
    if (m.from) idSet.add(String(m.from));
    (m.to || []).forEach(t => idSet.add(String(t)));
  }

  const users = await User.find({ _id: { $in: [...idSet] } })
    .select('username email avatarUrl name')
    .lean();

  const byId = Object.fromEntries(users.map(u => [String(u._id), u]));
  return mails.map(m => shapeMail(m, byId));
}

exports.sendMail = async (req, res) => {
  try {
    const senderId = req.userId;
    let { to, subject, body } = req.body;

    if (!senderId || !to || !subject || !body) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const raw = Array.isArray(to) ? to[0] : to;
    const rawStr = String(raw).trim();

    let receiverId = null;
    if (isValidObjectId(rawStr)) {
      receiverId = rawStr;
    } else {
      const key = rawStr.toLowerCase();
      const rec = await User.findOne(
        { $or: [{ email: key }, { username: key }] },
        { _id: 1 }
      ).lean();
      if (!rec) return res.status(404).json({ error: `Receiver not found: ${raw}` });
      receiverId = String(rec._id);
    }

    const senderExists = await User.exists({ _id: senderId });
    if (!senderExists) return res.status(404).json({ error: 'Sender not found' });

    const urls = extractUrls(body);
    const results = await Promise.all(urls.map(isUrlSafe));
    if (results.includes(false)) {
      return res.status(400).json({ error: 'Black-listed URL detected' });
    }

    const sentDoc = await Mail.create({
      ownerUserId: senderId,
      from: senderId,            
      to: [receiverId],          
      subject,
      body,
      labels: ['Sent'],
      read: true
    });

    await Mail.create({
      ownerUserId: receiverId,
      from: senderId,
      to: [receiverId],
      subject,
      body,
      labels: ['Inbox'],
      read: false
    });

    const [enriched] = await enrichUsers([sentDoc.toObject()]);
    return res
      .status(201)
      .location(`/api/mails/${sentDoc._id}`)
      .json(enriched);

  } catch (e) {
    console.error('Send failed:', e);
    return res.status(500).json({ error: 'Send failed' });
  }
};

exports.getInbox = async (req, res) => {
  const exists = await User.exists({ _id: req.userId });
  if (!exists) return res.status(404).json({ error: 'User not found' });

  const raw = await Mail.find({ ownerUserId: req.userId })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const enriched = await enrichUsers(raw);
  res.status(200).json(enriched);
};

exports.getMail = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ error: 'Missing or invalid id' });

  const m = await Mail.findOne({ _id: id, ownerUserId: req.userId }).lean();
  if (!m) return res.status(404).json({ error: 'Mail not found' });

  const [enriched] = await enrichUsers([m]);
  return res.status(200).json(enriched);
};

exports.updateMail = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ error: 'Missing or invalid id' });

  const allowed = {};
  if ('subject' in req.body) allowed.subject = req.body.subject;
  if ('body' in req.body)    allowed.body    = req.body.body;
  if ('labels' in req.body)  allowed.labels  = Array.isArray(req.body.labels) ? req.body.labels : [];

  const updated = await Mail.findOneAndUpdate(
    { _id: id, ownerUserId: req.userId },
    { $set: allowed },
    { new: true }
  ).lean();

  if (!updated) return res.status(404).json({ error: 'Mail not found or not editable' });

  const [enriched] = await enrichUsers([updated]);
  return res.status(200).json(enriched);
};

exports.deleteMail = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ error: 'Missing or invalid id' });

  const r = await Mail.deleteOne({ _id: id, ownerUserId: req.userId });
  return r.deletedCount ? res.sendStatus(204) : res.status(404).json({ error: 'Mail not found' });
};

exports.searchMails = async (req, res) => {
  const q = String(req.params.query || '').trim();
  if (!q) return res.status(400).json({ error: 'Missing query' });

  const re = new RegExp(q, 'i');
  const raw = await Mail.find({
    ownerUserId: req.userId,
    $or: [{ subject: re }, { body: re }]
  })
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  const enriched = await enrichUsers(raw);
  res.json(enriched);
};
