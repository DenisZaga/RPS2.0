const express = require("express");
const app = express();
const PORT = 3001;
const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://vladyslavdushko:jCQ18N5s0BXxWLcm@cluster0.dgx0wzg.mongodb.net/";
const client = new MongoClient(uri);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const socketIO = require('socket.io')(http, {
  cors: {
    origin: "*"
  }
});

const games = {}; 

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('joinGame', ({ gameId, playerName }) => {
    if (!games[gameId]) {
      games[gameId] = {};
    }
    games[gameId][socket.id] = { id: socket.id, name: playerName, choice: null };
    console.log(`${playerName} has joined the game ${gameId}`);
    socket.join(gameId);
    socketIO.to(gameId).emit('players', games[gameId]); 
  });

  socket.on('makeChoice', (choice) => {
    const gameId = Object.keys(games).find(gameId => games[gameId][socket.id]);
    if (gameId && games[gameId] && games[gameId][socket.id]) {
      games[gameId][socket.id].choice = choice;
      checkResults(gameId);
    }
  });

  socket.on('disconnectUser', () => {
    handleDisconnect(socket.id);
  });

  socket.on('disconnect', () => {
    handleDisconnect(socket.id);
  });

  const handleDisconnect = (socketId) => {
    const gameId = Object.keys(games).find(gameId => games[gameId][socketId]);
    if (gameId) {
      const playerName = games[gameId][socketId].name;
      delete games[gameId][socketId];
      socketIO.to(gameId).emit('players', games[gameId]);
      console.log(`🔥: ${playerName} has disconnected from game ${gameId}`);
    }
    console.log('🔥: A user disconnected');
  };
});

const checkResults = async (gameId) => {
  const players = Object.values(games[gameId]);
  if (players.length === 2) {
    const [player1, player2] = players;

    if (player1.choice && player2.choice) {
      let result1, result2;
      if (player1.choice === player2.choice) {
        result1 = result2 = "draw";
      } else if (
        (player1.choice === 'rock' && player2.choice === 'scissors') ||
        (player1.choice === 'scissors' && player2.choice === 'paper') ||
        (player1.choice === 'paper' && player2.choice === 'rock')
      ) {
        result1 = "win";
        result2 = "lose";
      } else {
        result1 = "lose";
        result2 = "win";
      }


      await updateGameResults(gameId, [{ name: player1.name, result: result1 }, { name: player2.name, result: result2 }]);
      

      socketIO.to(player1.id).emit('result', result1);
      socketIO.to(player2.id).emit('result', result2);


      if (games[gameId][player1.id]) {
        games[gameId][player1.id].choice = null;
      }
      if (games[gameId][player2.id]) {
        games[gameId][player2.id].choice = null;
      }
    }
  }
};

const updateGameResults = async (gameId, players) => {
  try {
    await client.connect();

    const database = client.db('test');
    const gamesCollection = database.collection('games');

    const filter = { _id: new ObjectId(gameId) };
    const updateDoc = {
      $set: {
        players: players,
        result: getResult(players)
      }
    };

    await gamesCollection.updateOne(filter, updateDoc);
    console.log(`Game ${gameId} updated with results`);
  } finally {
    await client.close();
  }
};

const getResult = (players) => {
  const winner = players.find(player => player.result === 'win');
  return winner ? winner.name : 'draw';
};

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
