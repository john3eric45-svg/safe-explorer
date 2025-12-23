const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 min
const activeSessions = new Map();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/start-session', (req, res) => {
  const { level } = req.body || {};
  const sessionId = Date.now().toString();
  setTimeout(() => activeSessions.delete(sessionId), SESSION_TIMEOUT);
  activeSessions.set(sessionId, { level });
  res.json({ sessionId, timeLeft: SESSION_TIMEOUT });
});

module.exports = app;
