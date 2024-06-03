// "use client"

// import { useEffect, useState } from "react";
// import { io } from 'socket.io-client';
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import rock from '../../../images/rock-user.png'
// import paper from '../../../images/paper-user.png'
// import scissors from '../../../images/scissors-user.png'
// import Navbar from "@/components/navbar";
// import Link from "next/link";
// const socket = io('http://localhost:3001');

// const GamePage = () => {
//   const { data: session } = useSession();
//   const [players, setPlayers] = useState({});
//   const [choice, setChoice] = useState(null);
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     if (session?.user?.name) {
//       socket.emit('joinGame', session.user.name);

//       socket.on('players', (players) => {
//         setPlayers(players);
//       });

//       socket.on('result', (result) => {
//         setResult(result);
//       });
//     }

//     return () => {
//       socket.off('players');
//       socket.off('result');
//     };
//   }, [session]);

//   const makeChoice = (choice) => {
//     setChoice(choice);
//     socket.emit('makeChoice', choice);
//   };

//   console.log(Object.values(players));

//   return (
//     <>
//     <Navbar/>
//     <div className="">
//     <div className="grid place-items-center">
      

//     </div>
//       <div className="flex justify-center align-center m-5">
//         {Object.values(players).slice(0, 2).map(player => (
//           <div key={player.id} ><span className="font-bold">{player.name}</span> </div>
//         ))}
//       </div>
//       <div className="flex flex-row justify-evenly m-5">
//         <button onClick={() => makeChoice('rock')}><Image src={rock} alt="rock" height={200} width={200} ></Image></button>
//         <button onClick={() => makeChoice('paper')}><Image src={paper} alt="paper" height={200} width={200} ></Image></button>
//         <button onClick={() => makeChoice('scissors')}><Image src={scissors} alt="scissors" height={200} width={200} ></Image></button>
//       </div>
//       {result && <div className="result">Result: {result}</div>}
//     </div>
//     <Link href='/dashboard'>Back</Link>
//     </>
//   );
// };

// export default GamePage;
"use client"

import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { useSession } from "next-auth/react";
import Image from "next/image";
import rock from '../../../images/rock-user.png';
import paper from '../../../images/paper-user.png';
import scissors from '../../../images/scissors-user.png';
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const socket = io('http://localhost:3001');

const GamePage = ({ params }) => {
  const { data: session } = useSession();
  const [players, setPlayers] = useState({});
  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState(null);
  const { id: gameId } = params; // Отримання id гри з параметрів

  useEffect(() => {
    const handleUnload = () => {
      // Отримання ID гри і відправка повідомлення про відключення гравця
      const gameId = // Отримайте ID гри, можливо, використовуючи useRouter
      socket.emit('disconnectGame', gameId);
    };
  
    window.addEventListener('beforeunload', handleUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  useEffect(() => {
    if (session?.user?.name && gameId) {
      socket.emit('joinGame', { gameId, playerName: session.user.name });

      socket.on('players', (gamePlayers) => {
        setPlayers(gamePlayers);
      });

      socket.on('result', (gameResult) => {
        setResult(gameResult);
      });
    }

    return () => {
      socket.off('players');
      socket.off('result');
    };
  }, [session, gameId]);

  const makeChoice = (playerChoice) => {
    setChoice(playerChoice);
    socket.emit('makeChoice', playerChoice);
  };

  return (
    <>
      <Navbar />
      <div className="">
        <div className="grid place-items-center">
        </div>
        <div className="flex justify-center align-center m-5">
          {Object.values(players).slice(0, 2).map(player => (
            <div key={player.id}>
              <span className="font-bold">{player.name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-evenly m-5">
          <button onClick={() => makeChoice('rock')}><Image src={rock} alt="rock" height={200} width={200} /></button>
          <button onClick={() => makeChoice('paper')}><Image src={paper} alt="paper" height={200} width={200} /></button>
          <button onClick={() => makeChoice('scissors')}><Image src={scissors} alt="scissors" height={200} width={200} /></button>
        </div>
        {result && <div className="result">Result: {result}</div>}
      </div>
      <Link href='/dashboard'>Back</Link>
    </>
  );
};

export default GamePage;


