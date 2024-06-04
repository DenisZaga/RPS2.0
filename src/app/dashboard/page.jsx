import Navbar from "@/components/navbar";
import CreateGame from "@/components/CreateGame";
import GameList from "@/components/GameList";
import UserInfo from "@/components/UserInfo"


export default function Dashboard() {

    return <>
    <div>
        <Navbar/>
        <UserInfo/>
        <CreateGame />
        <GameList />
    </div>
    </>;
}