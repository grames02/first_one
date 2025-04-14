const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

let users = []; // { email, password (hashed), token }
let votes = []; // { userEmail, artist, vote } where vote is 'yes' or 'no'

// ---------- AUTH ROUTES ----------

// CreateAuth a new user
app.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
app.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
app.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});





// ---------- MIDDLEWARE ----------
function authMiddleware(req, res, next) {
  const token = req.cookies[authCookieName];
  const user = users.find(u => u.token === token);
  if (!user) return res.status(401).send({ msg: 'Unauthorized' });
  req.user = user;
  next();
}






// ---------- VOTE ROUTES ----------

// Get vote for an artist
app.get('/api/votes/:artist', authMiddleware, (req, res) => {
  const artist = req.params.artist;
  const vote = votes.find(v => v.userEmail === req.user.email && v.artist === artist);
  res.send({ vote: vote?.vote || null });
});

// Submit vote
app.post('/api/votes', authMiddleware, (req, res) => {
  const { artist, vote } = req.body;
  const existing = votes.find(v => v.userEmail === req.user.email && v.artist === artist);

  if (existing) {
    existing.vote = vote; // Update
  } else {
    votes.push({ userEmail: req.user.email, artist, vote }); // New
  }

  res.send({ msg: 'Vote recorded', artist, vote });
});





// ---------- HELPERS ----------
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const path = require("path");

// Serve static files from the Vite build
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route: redirect everything else to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// ---------- START SERVER ----------
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});