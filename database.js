const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('dailyrocker'); // Your custom DB name

const userCollection = db.collection('users');
const voteCollection = db.collection('votes');

// Test the connection
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log('Connected to MongoDB');
  } catch (ex) {
    console.error(`Connection failed: ${ex.message}`);
    process.exit(1);
  }
})();

// User-related functions
function getUser(email) {
  return userCollection.findOne({ email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

// Vote-related functions
async function addVote(vote) {
  return voteCollection.insertOne(vote);
}

async function getUserVote(userEmail, artist) {
    const vote = await db.collection('votes').findOne({ user: userEmail, artist });
    return vote;
  }

async function saveOrUpdateVote(userEmail, artist, vote) {
  await db.collection('votes').updateOne(
    { user: userEmail, artist },
    { $set: { vote } },
    { upsert: true }
  );
}

// Get total yes/no votes per artist
async function getVoteTotals() {
    const votes = await voteCollection.find().toArray();
  
    const totals = {};
  
    for (const vote of votes) {
      const { artist, vote: voteType } = vote;
  
      if (!totals[artist]) {
        totals[artist] = { yes: 0, no: 0 };
      }
  
      if (voteType === 'yes') totals[artist].yes++;
      else if (voteType === 'no') totals[artist].no++;
    }
  
    return totals;
  }
  

  

async function getVotesByArtist() {
  return voteCollection.aggregate([
    { $group: { _id: "$artist", totalVotes: { $sum: 1 } } },
    { $sort: { totalVotes: -1 } }
  ]).toArray();
}

// Exporting functions so other files can use them
module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    addVote,
    getVotesByArtist,
    getUserVote,
    saveOrUpdateVote,
    getVoteTotals,
  };
  