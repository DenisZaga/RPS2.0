// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import io from 'socket.io-client';
// import Navbar from "@/components/navbar";

// export default function AddTopic() {
//   const [players, setPlayers] = useState("");
//   const [result, setResult] = useState("");

//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/games", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({ }),
//       });

//       if (res.ok) {
//         router.push("/");
//       } else {
//         throw new Error("Failed to connect");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   return (
//     <>
//     <Navbar />
//     <h1>Game page</h1>
//     <a href="/dashboard">Back</a>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import io from 'socket.io-client';
import Navbar from "@/components/navbar";

let socket;

export default function GamePage() {
  const [players, setPlayers] = useState([]);
  const [result, setResult] = useState("");
  const [gameId, setGameId] = useState(null);
  const [gameState, setGameState] = useState({ moves: [] });
  const router = useRouter();

  useEffect(() => {
    // Assuming gameId is passed as a query parameter
    const query = new URLSearchParams(window.location.search);
    const id = query.get('id');
    setGameId(id);

    if (id) {
      socket = io();

      socket.emit('joinGame', id);

      socket.on('playerJoined', (data) => {
        setPlayers((prevPlayers) => [...prevPlayers, data.playerId]);
      });

      socket.on('moveMade', (data) => {
        setGameState((prevState) => ({
          ...prevState,
          moves: [...prevState.moves, data]
        }));
      });

      socket.on('playerLeft', (data) => {
        setPlayers((prevPlayers) => prevPlayers.filter(player => player !== data.playerId));
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [gameId]);

  const makeMove = (move) => {
    console.log(move);
    socket.emit('makeMove', { playerId: socket.id, move });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/game?id=${data.gameId}`);
      } else {
        throw new Error("Failed to connect");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <h1>Game page</h1>
      <a href="/dashboard">Back</a>
      <div>
        <button onClick={() => makeMove('rock')}>Rock</button>
        <button onClick={() => makeMove('paper')}>Paper</button>
        <button onClick={() => makeMove('scissors')}>Scissors</button>
      </div>
      <div>
        {gameState.moves.map((move, index) => (
          <p key={index}>{move.playerId} chose {move.move}</p>
        ))}
      </div>
    </>
  );
}
