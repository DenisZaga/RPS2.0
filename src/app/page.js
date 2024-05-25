import Image from "next/image";
import GameList from "@/components/GameList";
import CreateGame from "@/components/CreateGame";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main>
      <LoginForm />
      {/* <CreateGame />
      <GameList /> */}
    </main>
  );
}
