import Navbar from "@/components/navbar";
import CreateGame from "@/components/CreateGame";
import GameList from "@/components/GameList";
import UserInfo from "@/components/UserInfo";
import User from "@/models/user";
import { useSession } from "next-auth/react";

export default function Dashboard() {

    return <>
    <Navbar/>
    <UserInfo/>
    <CreateGame />
    <GameList />
    </>;
}