import Navbar from "@/components/Navbar";
import PlayerList from "@/components/PlayerList";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
    return (
        <main className="flex min-h-screen flex-col items-center">
            {/* <Navbar /> */}
            <div className="flex w-[70%] flex-col items-center justify-center lg:flex-row lg:items-start">
                <PlayerList className="lg:basis-1/4" type="LINK" />
            </div>
        </main>
    );
};

export default page;
