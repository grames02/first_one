const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const path = require('path');
const DB = require('./database');

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
});

app.get('/api/vote-totals', async (req, res) => {
  const results = await DB.getVoteTotals();
  res.send(results);
});

// ---------- HELPER ----------
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// ---------- FRONTEND ROUTING ----------
app.use(express.static(path.join(__dirname, '..')));

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});
