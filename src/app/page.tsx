import KillFeed from "@/components/KillFeed";
import Navbar from "@/components/Navbar";
import PlayerList from "@/components/PlayerList";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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
                <div className="m-4 w-full rounded-lg bg-secondary lg:w-1/2">
                    <h1 className="my-2 w-full text-center text-2xl font-semibold">
                        Players
                    </h1>
                    <PlayerList type="LINK" />
                </div>
                <KillFeed />
            </div>
        </main>
    );
}
