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
  console.log('addMail called with:', { from, to, subject, body });
  const sender = users.find(u => u.id === from);
  const receiver = users.find(u => u.id === to || u.username === to || u.email === to);
  
  console.log('Sender found:', sender);
  console.log('Receiver found:', receiver);
  console.log('All users:', users.map(u => ({ id: u.id, username: u.username })));

  if (!sender || !receiver) return null;

  const mail = {
    id: uuidv4(),
    from: sender.id,
    to: receiver.id,
    subject,
    body,
    labels: ["Inbox"],
  };

  sender.sent.push(mail);
  receiver.inbox.push(mail);

  return mail;
};

exports.getLast50Mails = (userId) => {
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  const allMails = [...user.inbox, ...user.sent];
  
  // Convert UUIDs to usernames
  const mailsWithUsernames = allMails.map(mail => {
    const fromUser = users.find(u => u.id === mail.from);
    const toUser = users.find(u => u.id === mail.to);
    
    return {
      ...mail,
      from: fromUser ? fromUser.username : mail.from,
      to: toUser ? toUser.username : mail.to,
      labels: Array.isArray(mail.labels) ? [...mail.labels] : [],
    };
  });
  
  return mailsWithUsernames.reverse().slice(0, 50);
};

exports.getMailById = (userId, mailId) => {
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  return [...user.inbox, ...user.sent].find(m => m.id === mailId) || null;
};

exports.updateMail = (userId, mailId, { subject, body, labels }) => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;

  const mail = user.sent.find(m => m.id === mailId && m.from === user.id);
  // If not found in sent, try inbox (user may update received mail labels)
  const mailObj = mail || user.inbox.find(m => m.id === mailId);
  if (!mailObj) return false;

  if (subject !== undefined) mailObj.subject = subject;
  if (body !== undefined) mailObj.body = body;
  if (labels !== undefined && Array.isArray(labels)) mailObj.labels = labels;
  return true;
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
