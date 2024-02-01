import Navbar from "@/components/Navbar";
import PlayerManager from "@/components/PlayerManager";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar />
            <PlayerManager />
        </main>
    )
};

export default page;
