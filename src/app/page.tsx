import KillFeed from "@/components/KillFeed";
import Navbar from "@/components/Navbar";
import PlayerList from "@/components/PlayerList";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar />
            <div className="m-4 flex h-96 w-[70%] flex-row items-center justify-center rounded-lg bg-secondary">
                <div className="flex h-full w-1/2 flex-col items-center p-4">
                    <h1>Current Safezone</h1>
                    <div className="h-full w-full rounded-lg bg-primary"></div>
                </div>
                <div className="flex h-full w-1/2 flex-col items-center p-4">
                    <h1>Next Safezone</h1>
                    <div className="h-full w-full rounded-lg bg-primary"></div>
                </div>
            </div>
            <div className="flex w-[70%] flex-col items-center justify-center lg:flex-row lg:items-start">
                <PlayerList />
                <KillFeed />
            </div>
        </main>
    );
}
