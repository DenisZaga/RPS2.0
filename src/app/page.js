import Image from "next/image";
import GameList from "@/components/GameList";
import CreateGame from "@/components/CreateGame";

export default function Home() {
  return (
    <main>
        
      <CreateGame />
      <GameList />
    </main>
  );
}
