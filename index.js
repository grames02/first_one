const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const path = require('path');
const DB = require('./database');
const WebSocket = require('ws'); // Importing the ws package for WebSockets

const app = express();
const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// ---------- MIDDLEWARE ----------
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Serving static assets from 'public' directory

// ---------- AUTH ROUTES ----------
app.post('/auth/create', async (req, res) => {
  const existingUser = await DB.getUser(req.body.email);
  if (existingUser) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = {
      email: req.body.email,
      password: hashed,
      token: uuid.v4(),
    };

    await DB.addUser(user);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

app.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    user.token = uuid.v4();
    await DB.updateUser(user);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

app.delete('/auth/logout', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    await DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// ---------- AUTH MIDDLEWARE ----------
const verifyAuth = async (req, res, next) => {
  const user = await DB.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// ---------- WebSocket Setup ----------
const wss = new WebSocket.Server({ noServer: true });
const clients = new Set();

wss.on('connection', (ws) => {
  console.log('WebSocket connected');
  clients.add(ws);

  ws.on('message', (message) => {
    console.log('Received message:', message);
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('WebSocket closed');
  });
});

// ---------- VOTE ROUTES ----------
app.get('/api/votes/:artist', verifyAuth, async (req, res) => {
  const vote = await DB.getUserVote(req.user.email, req.params.artist);
  res.send({ vote: vote?.vote || null });
});

app.post('/api/votes', verifyAuth, async (req, res) => {
  const { artist, vote } = req.body;
  if (!artist || !vote) {
    return res.status(400).send({ msg: 'Missing artist or vote' });
  }

  await DB.saveOrUpdateVote(req.user.email, artist, vote);
  res.send({ msg: 'Vote recorded', artist, vote });

  // Broadcast updated vote totals after saving
  const results = await DB.getVoteTotals();
  const message = JSON.stringify({ voteTotals: results });
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  }
});

app.get('/api/vote-totals', async (req, res) => {
  const results = await DB.getVoteTotals();
  res.send(results);
});

// ---------- SERVER SETUP ----------
app.server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.server.on('upgrade', (request, socket, head) => {
  if (request.url.startsWith('/ws')) {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

// Serve the frontend from the root directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Catch-all: redirect any unknown route to home page
app.get('*', (req, res) => {
  res.redirect('/');
});

// ---------- HELPER ----------
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true, // Use secure cookies (only on HTTPS)
    httpOnly: true,
    sameSite: 'strict',
  });
}
