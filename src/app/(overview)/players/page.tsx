import Navbar from "@/components/Navbar";
import PlayerList from "@/components/PlayerList";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar />
            <div className="flex w-[70%] flex-col items-center justify-center lg:flex-row lg:items-start">
                <div className="m-4 w-full rounded-lg bg-secondary">
                    <h1 className="my-2 w-full text-center text-2xl font-semibold">
                        Players
                    </h1>
                    <PlayerList className="lg:basis-1/4" type="LINK" />
                </div>
            </div>
        </main>
    );
};

export default page;
