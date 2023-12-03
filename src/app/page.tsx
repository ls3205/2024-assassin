import KillFeed from "@/components/KillFeed";
import Navbar from "@/components/Navbar";
import PlayerList from "@/components/PlayerList";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
                <div className="group m-4 flex h-96 w-full flex-nowrap overflow-hidden rounded-lg bg-secondary lg:w-1/2">
                    <div className="flex flex-col items-center w-full">
                        <h1 className="my-2 w-full text-center text-2xl font-semibold">
                            Players
                        </h1>
                        <PlayerList />
                    </div>
                    <Link href={"/players"} className="-ml-[100%] box-border hidden h-full w-full flex-none bg-gradient-to-t from-neutral-200 from-10% to-transparent transition-all z-50 duration-100 group-hover:block dark:from-neutral-900">
                        <div className="w-full h-full flex justify-center items-end pb-4">
                            <h1 className="text-2xl font-semibold">
                                Click to View Full Player List
                            </h1>
                        </div>
                    </Link>
                </div>
                <KillFeed />
            </div>
        </main>
    );
}
