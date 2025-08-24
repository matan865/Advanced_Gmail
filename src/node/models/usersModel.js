const { v4: uuidv4 } = require('uuid');

// In-memory users store
const users = [];

function generateUniqueUsername(base) {
  const cleanBase = String(base || '').trim();
  if (!cleanBase) return null;
  let candidate = cleanBase;
  let i = 1;
  while (users.some(u => u.username === candidate)) {
    candidate = `${cleanBase}${i}`;
    i += 1;
  }
  return candidate;
}

exports.addUser = ({ username, password, name, email, avatarUrl }) => {
  // Ensure required fields
  if (!username || !password) return null;

  // Ensure uniqueness (generate unique if taken)
  const uniqueUsername = generateUniqueUsername(username);
  if (!uniqueUsername) return null;

  // Compute email from username (override provided)
  const computedEmail = `${uniqueUsername}@mail.com`;

  // Avatar defaults to one of our static avatars
  const finalAvatarUrl = avatarUrl || '/avatars/avatar1.png';

  const user = {
    id: uuidv4(),
    username: uniqueUsername,
    password,
    name: name || uniqueUsername,
    email: computedEmail,
    avatarUrl: finalAvatarUrl,
    inbox: [],
    sent: []
  };

  users.push(user);
  // Return user without password
  const { password: _pw, ...safeUser } = user;
  return safeUser;
};

exports.getAllUsers = () => users.map(({ password, ...u }) => u);

exports.getUserById = (id) => {
  const user = users.find(u => u.id === id);
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
};

// Find user by username or email and verify password
exports.findUser = (identifier, password) => {
  const key = String(identifier || '').trim();
  const pw = String(password || '');
  if (!key || !pw) return null;

  const user = users.find(u => u.username === key || u.email === key);
  if (!user) return null;
  if (user.password !== pw) return null;

  const { password: _pw, ...safeUser } = user;
  return safeUser;
};

exports.addMail = ({ from, to, subject, body }) => {
  const sender   = users.find(u => u.id === from);
  const receiver = users.find(u => u.id === to || u.username === to || u.email === to);
  if (!sender || !receiver) return null;

  const now = new Date().toISOString();

  // Copy for sender - "Sent"
  const sentMail = {
    id: uuidv4(),
    from: sender.id,
    to: receiver.id,
    subject,
    body,
    labels: ["Sent"],
    date: now,
  };
  sender.sent = Array.isArray(sender.sent) ? sender.sent : [];
  sender.sent.unshift(sentMail);

  // Copy for receiver - "Inbox"
  const inboxMail = {
    id: uuidv4(),
    from: sender.id,
    to: receiver.id,
    subject,
    body,
    labels: ["Inbox"],
    date: now,
  };
  receiver.inbox = Array.isArray(receiver.inbox) ? receiver.inbox : [];
  receiver.inbox.unshift(inboxMail);

  // Return the sender's copy, enriched with user information
  return {
    ...sentMail,
    from: toPublicUser(sender)   || sentMail.from,
    to:   toPublicUser(receiver) || sentMail.to,
  };
};

function toPublicUser(u) {
  if (!u) return null;
  const { id, username, email, avatarUrl, name } = u;
  return { id, username, email, avatarUrl, name };
}

exports.getLast50Mails = (userId) => {
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  // include both Inbox and Sent so "Sent" actually appears for the sender
  const allMails = [...user.inbox, ...user.sent];
  
  // Convert UUIDs to usernames
  const mailsWithUserObjects = allMails.map(mail => {
    const fromUser = users.find(u => u.id === mail.from);
    const toUser = users.find(u => u.id === mail.to);
    return {
      ...mail,
      from: toPublicUser(fromUser) || mail.from,
      to: toPublicUser(toUser) || mail.to,
      labels: Array.isArray(mail.labels) ? [...mail.labels] : [],
    };
  });
  
  return mailsWithUserObjects
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, 50);
};

exports.getMailById = (userId, mailId) => {
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  const found = [...user.inbox, ...user.sent].find(m => m.id === mailId) || null;
  if (!found) return null;
  const fromUser = users.find(u => u.id === found.from);
  const toUser = users.find(u => u.id === found.to);
  return {
    ...found,
    from: toPublicUser(fromUser) || found.from,
    to: toPublicUser(toUser) || found.to,
    labels: Array.isArray(found.labels) ? [...found.labels] : [],
  };
};


exports.updateMail = (userId, mailId, { subject, body, labels }) => {
  const user = users.find(u => u.id === userId);
  if (!user) return null;

// try label : sent if not faond 
  const mailObj =
    user.sent.find(m => m.id === mailId && m.from === user.id) ||
    user.inbox.find(m => m.id === mailId);

  if (!mailObj) return null;

  if (subject !== undefined) mailObj.subject = subject;
  if (body !== undefined)    mailObj.body    = body;
  if (labels !== undefined)  mailObj.labels  = Array.isArray(labels) ? labels : [];

  const fromUser = users.find(u => u.id === mailObj.from);
  const toUser   = users.find(u => u.id === mailObj.to);
  return {
    ...mailObj,
    from: toPublicUser(fromUser) || mailObj.from,
    to:   toPublicUser(toUser)   || mailObj.to,
    labels: Array.isArray(mailObj.labels) ? [...mailObj.labels] : [],
  };
};


exports.deleteMail = (userId, mailId) => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;

  const inboxBefore = user.inbox.length;
  const sentBefore = user.sent.length;

  user.inbox = user.inbox.filter(m => m.id !== mailId);
  user.sent = user.sent.filter(m => m.id !== mailId);

  return user.inbox.length < inboxBefore || user.sent.length < sentBefore;
};

exports.searchMails = (userId, query) => {
  const user = users.find(u => u.id === userId);
  if (!user) return [];

  const q = query.toLowerCase();
  const allMails = [...user.inbox, ...user.sent];

  return allMails.filter(mail =>
    mail.subject.toLowerCase().includes(q) ||
    mail.body.toLowerCase().includes(q)
  );
};