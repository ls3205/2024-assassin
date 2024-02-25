import KillFeed from "@/components/KillFeed";
import KillLeaderboard from "@/components/KillLeaderboard";
import Navbar from "@/components/Navbar";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
    return (
        <main className="flex min-h-screen flex-col items-center">
            {/* <Navbar /> */}
            <div className="flex w-[95%] flex-col lg:w-[70%] lg:flex-row">
                <KillFeed />
                <KillLeaderboard />
            </div>
        </main>
    );
};

export default page;
