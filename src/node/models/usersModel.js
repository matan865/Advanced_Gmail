const { v4: uuidv4 } = require('uuid');

const users = [];

exports.addUser = ({ username, password, name, email, avatarUrl }) => {
  if (users.find(u => u.username === username)) {
    return null;
  }

  const user = {
    id: uuidv4(),
    username,
    password,
    name,
    email,
    avatarUrl,
    inbox: [],
    sent: []
  };

  users.push(user);
  return user;
};

exports.getUserById = (id) => {
  const user = users.find(u => u.id === id);
  if (!user) return null;

  const { password, ...safeUser } = user;
  return safeUser;
};

exports.findUser = (username, password) => {
  return users.find(u => u.username === username && u.password === password);
};

exports.addMail = ({ from, to, subject, body }) => {
  const sender = users.find(u => u.id === from);
  const receiver = users.find(u => u.id === to);

  if (!sender || !receiver) return null;

  const mail = {
    id: uuidv4(),
    from: sender.id,
    to: receiver.id,
    subject,
    body,
  };

  sender.sent.push(mail);
  receiver.inbox.push(mail);

  return mail;
};

exports.getLast50Mails = (userId) => {
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  const allMails = [...user.inbox, ...user.sent];
  return allMails.reverse().slice(0, 50);
};

exports.getMailById = (userId, mailId) => {
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  return [...user.inbox, ...user.sent].find(m => m.id === mailId) || null;
};

exports.updateMail = (userId, mailId, { subject, body }) => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;

  const mail = user.sent.find(m => m.id === mailId && m.from === user.id);
  if (!mail) return false;

  if (subject !== undefined) mail.subject = subject;
  if (body !== undefined) mail.body = body;
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
