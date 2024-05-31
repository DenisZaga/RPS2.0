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

import Navbar from "@/components/navbar";
import Image from "next/image";
import rock from '../../../images/rock-user.png'
import paper from '../../../images/paper-user.png'
import scissors from '../../../images/scissors-user.png'

export default function GamePage() {
  return (
    <>
      <Navbar />
      <section className="flex justify-between flex-col h-96">
        <h1 className="ml-auto mr-auto mt-0 mb-0">Game page</h1>
        
        <div className="flex align-center  justify-evenly">
        <button>
          <Image src={rock} alt="rock" height={200} width={200} ></Image>
        </button>
        <button>
          <Image src={paper} alt="paper" height={200} width={200} ></Image>
        </button>
        <button>
          <Image src={scissors} alt="scissors" height={200} width={200} ></Image>
        </button>

        </div>
        <a href="/dashboard" className="ml-auto mr-auto mt-0 mb-0">Back</a>
      </section>
    </>
  );
}

