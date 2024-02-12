import CountdownClock from "@/components/CountdownClock";
import KillFeed from "@/components/KillFeed";
import Navbar from "@/components/Navbar";
import PlayerList from "@/components/PlayerList";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Safezone from "../../public/Safezone2.png";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar />
            <div className="m-4 flex w-[95%] flex-col items-center justify-center rounded-lg bg-secondary md:h-96 md:w-[70%] md:flex-row">
                <div className="flex h-full w-[70%] flex-col items-center p-4 md:w-1/2">
                    <CountdownClock
                        title="Assassin Countdowns"
                        className="flex flex-col items-center justify-center bg-secondary"
                    />
                </div>
                <div className="flex h-full w-[70%] flex-col items-center p-4 md:w-1/2">
                    <h1>Current Safezone</h1>
                    <div className="flex h-full w-full flex-row items-center justify-center rounded-lg bg-primary">
                        <Image
                            src={Safezone}
                            alt="Safezone"
                            placeholder="blur"
                            quality={100}
                            className="rounded-lg"
                            height={320}
                        />
                    </div>
                </div>
            </div>
            <div className="flex w-[95%] flex-col items-center justify-center md:w-[70%] lg:flex-row lg:items-start">
                <div className="group m-4 flex h-96 w-full flex-nowrap overflow-hidden rounded-lg bg-secondary lg:w-1/2">
                    <div className="flex h-full w-full flex-col items-center">
                        <h1 className="my-2 w-full text-center text-2xl font-semibold">
                            Players
                        </h1>
                        <PlayerList />
                    </div>
                    <Link
                        href={"/players"}
                        className="z-50 -ml-[100%] box-border h-full w-full flex-none bg-gradient-to-t from-neutral-200 from-5% to-transparent transition-all duration-100 group-hover:from-background dark:from-neutral-900"
                    >
                        <div className="hidden h-full w-full items-end justify-center pb-4 group-hover:flex">
                            <h1 className="text-2xl font-semibold">
                                Click to View Full Player List
                            </h1>
                        </div>
                    </Link>
                </div>
                <div className="group m-4 flex h-96 w-full flex-nowrap overflow-hidden rounded-lg bg-secondary lg:w-1/2">
                    <div className="flex h-full w-full flex-col items-center">
                        <h1 className="my-2 w-full text-center text-2xl font-semibold">
                            Kills
                        </h1>
                        <KillFeed className="bg-secondary/80" noTitle />
                    </div>
                    <Link
                        href={"/kills"}
                        className="z-50 -ml-[100%] box-border h-full w-full flex-none bg-gradient-to-t from-neutral-200 from-5% to-transparent transition-all duration-100 group-hover:from-background dark:from-neutral-900"
                    >
                        <div className="hidden h-full w-full items-end justify-center pb-4 group-hover:flex">
                            <h1 className="text-2xl font-semibold">
                                Click to View Full Kill Feed
                            </h1>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
