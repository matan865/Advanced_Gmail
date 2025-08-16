const net = require('net');
const usersModel = require('../models/usersModel');

const HOST = 'server';
const PORT = 5555; 

function extractUrls(text) {
  const regex = /(?:https?:\/\/)?(?:www\.)?[^\s]+/g;
  return text.match(regex) || [];
}

function isUrlSafe(url) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return Promise.resolve(true); 
  }

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


exports.sendMail = (req, res) => {
  const senderId = req.userId; // From auth middleware
  const { to, subject, body } = req.body;

  if (!senderId || !to || !subject || !body) {
    return res.status(400).json({ error: 'Missing required fields' }); // Bad Request
  }

  const urls = extractUrls(body);
  Promise.all(urls.map(isUrlSafe))
    .then(results => {
      if (results.includes(false)) {
        return res.status(400).json({ error: 'Black-listed URL detected' }); //Bad Request
      }
      const mail = usersModel.addMail({ from: senderId, to, subject, body });
      if (!mail) {
        return res.status(404).json({ error: 'Sender or recipient not found' });// Not Found
      }
      res.status(201).location(`/api/mails/${mail.id}`).json({ok:"ok "}); // Created
    })
    .catch(err => {
      console.error('Link validation failed:', err.message);
      return res.status(500).json({ error: 'Link validation failed' }); // Internal Server Error
    });
};

exports.getInbox = (req, res) => {
  const userId = req.userId; // From auth middleware
  const mails = usersModel.getLast50Mails(userId);
  if (!mails) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.status(200).json(mails);
};

exports.getMail = (req, res) => {
  const userId = req.userId; // From auth middleware
  const mailId = req.params.id;
  if (!userId || !mailId) {
    return res.status(400).json({ error: 'Missing parameters' }); // Bad Request
  }
  const mail = usersModel.getMailById(userId, mailId);
  return mail ? res.status(200).json(mail) : res.status(404).json({ error: 'Mail not found' }); // ? OK : Not Found
};

exports.updateMail = (req, res) => {
  const userId = req.userId; // From auth middleware
  const mailId = req.params.id;
  const { subject, body } = req.body;
  if (!userId || !mailId) {
    return res.status(400).json({ error: 'Missing parameters' }); // Bad Request
  }
  const updated = usersModel.updateMail(userId, mailId, { subject, body });
  return updated ? res.sendStatus(204) : res.status(404).json({ error: 'Mail not found or not editable' }); // ? No Content : Not Found
};

exports.deleteMail = (req, res) => {
  const userId = req.userId; // From auth middleware
  const mailId = req.params.id;
  if (!userId || !mailId) {
    return res.status(400).json({ error: 'Missing parameters' });
  }
  const removed = usersModel.deleteMail(userId, mailId);
  return removed ? res.sendStatus(204) : res.status(404).json({ error: 'Mail not found' });
};

exports.searchMails = (req, res) => {
  const userId = req.userId; // From auth middleware
  const query = req.params.query;

  if (!userId || !query) {
    return res.status(400).json({ error: 'Missing user-id header or query parameter' }); // Bad Request
  }

  const results = usersModel.searchMails(userId, query);
  return res.status(200).json(results); // OK
};
