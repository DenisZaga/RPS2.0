import connectMongoDB from "@/lib/mongodb";
import Game from "@/models/game";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newName: name, newResult: result, playersNames: { player1, player2 } } = await request.json();
    
    await connectMongoDB();
    await Game.findByIdAndUpdate(id, { name, result, players: [player1, player2] });
  
    return NextResponse.json({ message: "Game updated" }, { status: 200 });
  }

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const game = await Game.findOne({ _id: id });
  return NextResponse.json({ game }, { status: 200 });
}

// const express = require('express');
// const { createServer } = require('http');
// const { Server } = require('socket.io');
// const next = require('next');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();
//   const httpServer = createServer(server);
//   const io = new Server(httpServer);

//   // Сокет-менеджмент
//   io.on('connection', (socket) => {
//     console.log('a user connected: ', socket.id);

//     socket.on('joinGame', (gameId) => {
//       socket.join(gameId);
//       console.log(`User ${socket.id} joined game ${gameId}`);

//       io.to(gameId).emit('playerJoined', { playerId: socket.id });

//       socket.on('makeMove', (data) => {
//         io.to(gameId).emit('moveMade', data);
//       });

//       socket.on('disconnect', () => {
//         console.log('user disconnected: ', socket.id);
//         io.to(gameId).emit('playerLeft', { playerId: socket.id });
//       });
//     });
//   });

//   server.all('*', (req, res) => {
//     return handle(req, res);
//   });

//   const PORT = process.env.PORT || 3000;
//   httpServer.listen(PORT, (err) => {
//     if (err) throw err;
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// });
