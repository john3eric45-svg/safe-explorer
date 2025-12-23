const express = require('express');
const app = express();
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 min

app.use(express.static('public'));
app.use(express.json());

const activeSessions = new Map();

app.post('/api/start-session', (req, res) => {
  const { level } = req.body;
  const sessionId = Date.now().toString();
  setTimeout(() => activeSessions.delete(sessionId), SESSION_TIMEOUT);
  activeSessions.set(sessionId, { level });
  res.json({ sessionId, timeLeft: SESSION_TIMEOUT });
});

app.get('*', (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});

module.exports = app;
