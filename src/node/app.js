const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users');
const tokensRouter = require('./routes/tokens');
const mailsRouter = require('./routes/mails');
const labelsRouter = require('./routes/labels');
const blacklistRouter = require('./routes/blacklist');

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/mails', mailsRouter);
app.use('/api/labels', labelsRouter);
app.use('/api/blacklist', blacklistRouter);

const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

app.get((req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

module.exports = app;